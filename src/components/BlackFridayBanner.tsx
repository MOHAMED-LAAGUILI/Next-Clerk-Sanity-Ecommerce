import { COUPON_CODES } from "@/sanity/lib/Groq_Queries/CouponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/Groq_Queries/getActiveSaleByCouponCode";
import React from "react";
import Countdown from "./Coundown"; 

const BlackFridayBanner = async () => {
    const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY);

    // Check if sale data is available
    if (!sale) {
        return (
            <div className="w-full bg-black text-white py-4 px-6 rounded-lg shadow-lg flex items-center justify-center">
                <p>No active sale available for this coupon code.</p>
            </div>
        );
    }

    // Destructure necessary values
    const { saleTitle, saleDescription, discountAmount, couponCode, validFrom, validTo } = sale;

    // Create Date objects for validFrom and validTo
    const validFromDate = validFrom ? new Date(validFrom) : null;
    const validToDate = validTo ? new Date(validTo) : null;

    return (
        <div className="w-full dark:bg-gray-700 dark:text-gray-100 py-4 px-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-x-4">
                <h2 className="text-2xl font-bold text-red-500">{saleTitle}</h2>
                <p className="text-lg">{saleDescription}</p>
                <p className="font-semibold text-xl mt-2 md:mt-0 text-yellow-300">{discountAmount}% OFF</p>
            </div>

            <div className="flex items-center space-x-4">
                <div className="bg-red-500 px-4 py-2 rounded-md text-white font-semibold">
                    Use Coupon: <span className="text-lg">{couponCode}</span>
                </div>
                
                <div className="bg-gray-800 px-4 py-2 rounded-md text-white font-semibold">
                    Valid: {validFromDate ? validFromDate.toLocaleDateString() : "Not specified"} - {validToDate ? validToDate.toLocaleDateString() : "Not specified"}
                </div>

                {/* Render the Countdown component and pass validToDate */}
                <Countdown validTo={validToDate} />
            </div>
        </div>
    );
};

export default BlackFridayBanner;