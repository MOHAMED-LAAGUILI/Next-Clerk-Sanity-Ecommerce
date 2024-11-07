"use server"

import { BasketItem } from "@/store/store";
import stripe from './../src/lib/stripe';  // Ensure this is correctly set to your Stripe instance
import { imageUrl } from "@/lib/imageUrl";

// Types for metadata and grouped items
export type Metadata = {
  orderNumber: string;
  custumerName: string;
  custumerEmail: string;
  clerkUserId: string;
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  console.log("==> Starting createCheckoutSession");

  try {
    // Step 1: Validate that every item has a price
    console.log("Step 1: Validating prices for items...");
    const itemWithoutPrice = items.filter((item) => item.product.price === undefined);

    if (itemWithoutPrice.length > 0) {
      const missingPrices = itemWithoutPrice.map(item => item.product.name || 'Unnamed product').join(', ');
      console.error(`Error: Price is required for the following item(s): ${missingPrices}`);
      throw new Error(`Price is required for the following item(s): ${missingPrices}`);
    }
    console.log("All items have valid prices.");

    // Step 2: Fetch the customer by email (or create if not found)
    console.log("Step 2: Fetching customer by email...");
    const customers = await stripe.customers.list({
      email: metadata.custumerEmail,
      limit: 1,
    });

    let customerId: string | undefined;

    if (customers.data.length > 0) {
      // If a customer exists, use their ID
      console.log("Customer found, using existing customer ID.");
      customerId = customers.data[0].id;
    } else {
      // Create a new customer if not found
      console.log("No customer found, creating new customer...");
      const newCustomer = await stripe.customers.create({
        email: metadata.custumerEmail,
        name: metadata.custumerName,
      });
      customerId = newCustomer.id;
      console.log(`New customer created with ID: ${customerId}`);
    }

    // Step 3: Generate the base URL dynamically based on environment
    console.log("Step 3: Generating base URL for success and cancel URLs...");
    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;
    console.log(`Base URL: ${baseUrl}`);

    // Define the success and cancel URLs
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/basket`;
    console.log(`Success URL: ${successUrl}`);
    console.log(`Cancel URL: ${cancelUrl}`);

    // Step 4: Create the checkout session
    console.log("Step 4: Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_creation: customerId ? undefined : "always", // only create if new customer
      customer_email: !customerId ? metadata.custumerEmail : undefined, // Send email only if new customer
      metadata,
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          unit_amount: Math.round((item.product.price ?? 0) * 100), // Handle price safely
          product_data: {
            name: item.product.name || "Unnamed product",
            description: `Product ID: ${item.product._id}`,
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });

    console.log("Checkout session created successfully.");
    // Return the session URL for redirecting the user
    console.log("Returning session URL: ", session.url);
    return session.url;

  } catch (error) {
    // Type the error as an instance of Error to safely access the message
    if (error instanceof Error) {
      console.error("Error in createCheckoutSession:", error.message);
      throw new Error(`Error creating checkout session: ${error.message}`);
    } else {
      // If the error is not of type Error, we handle it gracefully
      console.error("Unknown error occurred in createCheckoutSession:", error);
      throw new Error("An unknown error occurred while creating the checkout session.");
    }
  }
}
