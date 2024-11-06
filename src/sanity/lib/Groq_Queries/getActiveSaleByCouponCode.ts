import { defineQuery } from "next-sanity";
import { CouponCode } from "./CouponCodes";
import { sanityFetch } from "../live";

// This is your query for fetching the active sale by coupon code
export const getActiveSaleByCouponCode = async (couponCode: CouponCode) => {
  // Define the query to fetch the active sale by coupon code
  const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[_type == "sales" 
    && isActive == true 
    && couponCode == $couponCode
    && validFrom <= now() 
    && validTo >= now()] | order(validFrom desc)[0] {
      saleTitle,
      saleDescription,
      discountAmount,
      couponCode,
      validFrom,
      validTo
    }
  `);

  try {
    // Perform the query using the 'sanityFetch' utility
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_QUERY,
      params: { couponCode },
    });

    // Check if an active sale was returned
    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error(`Error fetching coupon code ${couponCode}: ${error}`);
    return null; // Return null if there's an error
  }
};
