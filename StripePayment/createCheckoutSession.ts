'use server'

import { BasketItem } from "@/store/store";
import stripe from './../src/lib/stripe';
import { imageUrl } from "@/lib/imageUrl";

export type Metadata = {
    orderNumber: string;
    custumerName: string;
    custumerEmail: string;
    clerkUserId: string;
  }

  export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
  }

  export async function createCheckoutSession (
items: GroupedBasketItem[],
metadata: Metadata
  ){

    try {
        const itemWithoutPrice = items.filter((item) => !item.product.price);

        if (itemWithoutPrice.length > 0) {
            throw new Error("Price is required for all items");
            
        }

        const customers = await stripe.customers.list({
          email: metadata.custumerEmail,
          limit:1,
        })

        let customerId: string | undefined;

        if(customers.data.length > 0){
            customerId = customers.data[0].id;
        }

        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          customer_creation: customerId ? undefined : "always",
          customer_email: !customerId ? metadata.custumerEmail : undefined,
          metadata,
          mode:"payment",
          allow_promotion_codes:true,
          success_url:`${`https://${process.env.VERCEL_URL}`||process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
          cancel_url:`${`https://${process.env.VERCEL_URL}`|| process.env.VERCEL_URL}/basket`,
        line_items:items.map((item) => ({
price_data:{
  currency:'usd',
  unit_amount: Math.round(item.product.price! * 100),
  product_data:{
    name:item.product.name || "unamed product",
    description: `Product ID: ${item.product._id}`,
    metadata:{
      id:item.product._id,
    },
    images:item.product.image
    ? [imageUrl(item.product.image).url()]
    : undefined,
  },
},
          quantity:item.quantity
        }))
        })
        
        
        return session.url

    } catch (error) {
        console.error(`err creating checout session: ${error}`);
        throw error;
    }
  }