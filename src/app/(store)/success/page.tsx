"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useBasketStore from "@/store/store";
import { motion } from "framer-motion"; // For animations
import { Button } from '@/components/ui/button';
import Link from "next/link";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const sessionId = searchParams.get("session_id");
  const clearBasket = useBasketStore((state) => state.clearBasket);


  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

 

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-300 via-teal-400 to-blue-500 py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-lg shadow-xl space-y-8">
        
        {/* Success Icon with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120" className="mx-auto">
            <circle cx="50" cy="50" r="45" stroke="#4CAF50" strokeWidth="5" fill="#4CAF50" />
            <path d="M35,50 L45,60 L60,40" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="50%" y="75%" textAnchor="middle" fontSize="14" fill="white" fontFamily="Arial, sans-serif">Success</text>
          </svg>
          <h1 className="text-4xl font-bold text-green-600">Thank You!</h1>
          <p className="text-lg mt-2">Your payment has been successfully processed.</p>
          <p className="text-lg mt-2 ">Your order will be shipped shortly.</p>
        </motion.div>

    {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4"
        >
          <p className="text-lg ">You will receive an email confirmation shortly.</p>
          <div className="flex justify-center gap-4">
            <Button className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition-all duration-300">
              <Link href="/orders">View Order Details</Link>
            </Button>
            <Button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;
