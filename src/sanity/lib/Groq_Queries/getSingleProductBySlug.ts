import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

const GetSingleProductBySlug = async (slug: string) => {
  const GET_PRODUCT_BY_SLUG = defineQuery(`
    *[_type == "products" && slug.current == $slug][0]
  `);

  try {
    const products = await sanityFetch({
      query: GET_PRODUCT_BY_SLUG,
      params: {
        slug, // No need to concatenate with '*' unless necessary
      },
    });

    return products?.data || null; // Returning null if no data found
  } catch (error) {
    console.error('Error fetching product by slug:', error); // Improved error logging
    return null; // Return null or empty array as fallback
  }
};

export default GetSingleProductBySlug;
