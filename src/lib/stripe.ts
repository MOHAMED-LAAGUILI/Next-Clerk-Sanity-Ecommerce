import Stripe from "stripe";



if(!process.env.STRIPE_SECRET_KEY){
    throw new Error("process.env.STRIPE_SECRET_KEY is not found")
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY,{
    apiVersion:"2024-10-28.acacia",
})


export default stripe;