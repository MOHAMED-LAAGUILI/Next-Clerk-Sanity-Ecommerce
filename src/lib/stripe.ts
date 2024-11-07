import Stripe from "stripe";  // Import the Stripe class from the Stripe library

// Retrieve the Stripe secret key from environment variables
const stripeKey = process.env.STRIPE_SECRET_KEY; 

// Ensure the Stripe secret key is available
if (!stripeKey) {
  throw new Error("STRIPE_SECRET_KEY is not found. Please check your environment variables.");
}

// Create a Stripe instance with the provided secret key and specify the API version
const stripe = new Stripe(stripeKey, {
  apiVersion: "2024-10-28.acacia",  // You can adjust this version as necessary
});

export default stripe;  // Export the Stripe instance to be u
