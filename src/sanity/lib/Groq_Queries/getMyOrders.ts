import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
    if (!userId) {
        throw new Error('User ID is required');
    }

    // Define the query to fetch orders for the given user ID
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && stripeCustomerId == $userId] | order(orderDate desc) {
            _id,
            orderNumber,
            orderDate,
            totalPrice,
            discount,  
            currency,
            orderStatus,
            products[] {
                _key,
                quantity,
                price,
                product-> { // Dereference to fetch all fields from the product schema
                    _id,
                    name,
                    description,  // Include description field from product
                    price,         // Include price field from product
                    image,         // Include image field from product (assuming it's an image reference)
                          
                }
            }
        }
    `);

    try {
        // Fetch orders using the defined query and pass the userId parameter
        const orders = await sanityFetch({ query: MY_ORDERS_QUERY, params: { userId } });

        // Check if response contains the expected data
        if (orders?.data) {
            return orders.data;
        } else {
            console.warn("No orders found for user ID:", userId);
            return [];
        }
    } catch (error) {
        // Improved error logging for better debugging
        console.error("Error fetching orders for user ID:", userId, error);
        return [];
    }
}
