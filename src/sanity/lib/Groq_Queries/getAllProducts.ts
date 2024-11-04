import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`*[_type == "products"] | order(name asc)`);
    
  try {
    const products = await sanityFetch({ query: ALL_PRODUCTS_QUERY });
    return products || []; // Ensure you return an empty array if no products found
  } catch (error) {
    console.error(`Error fetching products: ${error}`);
    return []; // Return an empty array on error
  }
};
