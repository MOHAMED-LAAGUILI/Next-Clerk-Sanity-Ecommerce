import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live"; // Ensure sanityFetch is properly configured

// Function to get products by category using a category slug
export const getProductsByCategory = async (categorySlug: string) => {
  // Define the query to fetch products by category using a reference to the category
  const PRODUCTS_SELECTED_BY_CATEGORY = defineQuery(`
    *[_type == "products" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
  `);

  try {
    // Fetch the products using the defined query and pass the categorySlug parameter
    const products = await sanityFetch({
      query: PRODUCTS_SELECTED_BY_CATEGORY,
      params: {
        categorySlug: categorySlug // Pass the categorySlug without any wildcards
      },
    });

    // Check if products exist and return the result, otherwise return an empty array
    return products?.data || [];
  } catch (error) {
    console.error(`Error fetching products by category ${categorySlug}:`, error);
    return []; // Return an empty array in case of error
  }
};
