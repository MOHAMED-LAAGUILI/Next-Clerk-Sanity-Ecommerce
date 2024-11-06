'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import useBasketStore, { BasketItem } from '@/store/store';
import { useAuth, useUser, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import AddToBasketButton from '@/components/AddToBasketButton';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { toast } from 'react-toastify';
import { createCheckoutSession, Metadata } from '../../../../StripePayment/createCheckoutSession';



 const BasketPage = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const { getGroupedItems, getTotalPrice, clearBasket } = useBasketStore();
  const groupedItems = getGroupedItems(); // Get all items in the basket (grouped)
  const totalPrice = getTotalPrice(); // Get total price of all items
  const [isLoading, setIsLoading] = useState(false);

  const handleClearBasket = () => {
    clearBasket(); // Clear the basket
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    // Check if basket is empty
    if (groupedItems.length === 0) {
      toast.error('Your basket is empty. Add some items first!', {
        position: "top-center",
        autoClose: 5000,
      });
      setIsLoading(false); // Stop loading
      return;
    }

    // Check if the user is signed in
    if (!isSignedIn) {
      toast.error('You are not signed in yet. Please sign in to proceed.', {
        position: "top-center",
        autoClose: 5000,
      });
      setIsLoading(false); // Stop loading
      return;
    }

    try {
      // Safely access user data
      const orderNumber = crypto.randomUUID()
      const customerName = user?.fullName ?? "Unknown";
      const customerEmail = user?.emailAddresses[0]?.emailAddress ?? "Unknown";
      const userId = user?.id ?? "";


      const metadata: Metadata = {
        orderNumber: orderNumber,
        custumerName: customerName,  // Correct property name as per error
        custumerEmail: customerEmail, // Correct property name as per error
        clerkUserId:  userId, // Ensure it's a valid string
      };

      // Create the checkout session (ensure this is a valid function and returns the checkout URL)
      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      // Redirect to checkout page if URL is returned
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        toast.error('Failed to create checkout session. Please try again later.', {
          position: "top-center",
          autoClose: 5000,
        });
      }
    } catch (error: any) {
      // Log the error for debugging and display a toast message
      console.error('Checkout error:', error);
      toast.error(`An error occurred during checkout: ${error?.message || error}`, {
        position: "top-center",
        autoClose: 5000,
      });
    } finally {
      // Ensure the loading state is turned off even in case of error
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      {/* Basket Header */}
      <div className="bg-blue-600 text-white py-6 px-4 md:px-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center">Your Shopping Basket</h1>
      </div>

      {/* Basket Content */}
      <div className="flex flex-col md:flex-row p-4 md:p-8 space-y-6 md:space-y-0 md:space-x-8">
        {/* Basket Items */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
          {groupedItems.length === 0 ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold">Your basket is empty.</h2>
              <Link href="/" className="text-blue-600 underline hover:text-blue-700 transition-colors">
                Go back to shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {groupedItems.map((item: BasketItem) => {
                const product = item.product;
                const productPrice = product.price ?? 0; // Handle possible undefined price
                const productImageUrl = product.image
                  ? imageUrl(product.image).url()
                  : '/path/to/fallback-image.jpg'; // Replace with a default image path

                // Check if the product is out of stock
                const isOutOfStock = !product.stock || product.stock <= 0;

                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md space-x-4 hover:scale-105 transition-transform"
                  >
                    <div
                      className="flex items-center space-x-4 cursor-pointer"
                      onClick={() => router.push(`/product/${product.slug?.current}`)}
                    >
                      {/* Product Image */}
                      <Image
                        src={productImageUrl}
                        alt={product.name ?? 'Product Image'}
                        className="w-20 h-20 object-cover rounded-md"
                        width={80}
                        height={80}
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.description}</p>
                        {/* Out of Stock Message */}
                        {isOutOfStock && (
                          <p className="text-sm text-red-600 mt-1">Out of Stock</p>
                        )}
                      </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-2">
                      <AddToBasketButton
                        product={product}
                        disabled={isOutOfStock} // Disables the button when out of stock
                      />
                    </div>

                    {/* Price */}
                    <div className="text-xl font-semibold">${(productPrice * item.quantity).toFixed(2)}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Basket Summary */}
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full md:w-96 md:sticky md:top-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold">Basket Summary</h2>
            <button
              onClick={handleClearBasket}
              className="bg-red-600 px-4 py-2 rounded-md font-semibold hover:bg-red-700 transition-colors"
            >
              Clear Basket
            </button>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-lg">Total:</p>
            <p className="text-2xl font-bold">${totalPrice.toFixed(2)}</p>
          </div>

          {isSignedIn ? (
            <div className="mt-6 text-center">
              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors"
              >
                {isLoading ? "Processing..." : "Checkout"}
              </button>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Sign in to Checkout
                </button>
              </SignInButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;