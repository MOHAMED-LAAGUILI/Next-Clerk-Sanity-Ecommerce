import { COUPON_CODES } from "@/sanity/lib/Groq_Queries/CouponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/Groq_Queries/getActiveSaleByCouponCode";
import React from "react";
import Countdown from "./Countdown";
import { FaTags, FaRegClock, FaClipboard } from "react-icons/fa"; // Importing icons

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
    <div className="w-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white py-6 px-4 md:px-8 rounded-lg shadow-xl flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 m-1">
      {/* Sale Information */}
      <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6 w-full max-w-5xl">
        <div className="flex flex-col">
          <h2 className="text-3xl md:text-4xl font-extrabold">{saleTitle}</h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-md">{saleDescription}</p>
          <p className="text-2xl font-semibold text-yellow-400">{discountAmount}% OFF</p>
        </div>

        {/* Countdown Timer */}
        {validToDate && (
          <div className="flex items-center space-x-2 bg-yellow-400 text-black px-4 md:px-6 py-2 rounded text-lg font-semibold shadow-md">
            <FaRegClock className="text-xl" />
            <span>Ends In:</span>
            <Countdown validTo={validToDate} />
          </div>
        )}
      </div>

      {/* Coupon Code & Validity */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6 space-y-4 md:space-y-0 w-full max-w-5xl">
        {/* Coupon Code */}
        <div className="flex items-center space-x-2 bg-black bg-opacity-70 px-4 md:px-6 py-2 rounded text-white font-semibold text-lg shadow-md">
          <FaClipboard className="text-xl" />
          <span>Use Coupon: <span className="font-bold">{couponCode}</span></span>
        </div>

        {/* Validity Dates */}
        <div className="flex items-center space-x-2 bg-gray-800 bg-opacity-80 px-4 md:px-6 py-2 rounded-full text-white font-semibold text-lg shadow-md">
          <FaTags className="text-xl" />
          <span>Valid: {validFromDate ? validFromDate.toLocaleDateString() : "Not specified"} - {validToDate ? validToDate.toLocaleDateString() : "Not specified"}</span>
        </div>
      </div>
    </div>
  );
};

export default BlackFridayBanner;