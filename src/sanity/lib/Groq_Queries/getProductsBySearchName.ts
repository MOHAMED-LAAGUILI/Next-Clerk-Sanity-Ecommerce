import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductByName = async (searchParams:string) => {
 
    const PRODUCT_SEARCH_QUERY =  defineQuery(`
    *[_type == "products" && name match $searchParams] | order(name asc)
    `);


try {
    const products = await sanityFetch({ query: PRODUCT_SEARCH_QUERY,
      params: {
        searchParams:`${searchParams}*`
      },
    });
    
      return products.data || [];
   
  } catch (error) {
    console.log(`err fetch Products by name ${JSON.stringify(error)}`);
    return []; 
  }
};



