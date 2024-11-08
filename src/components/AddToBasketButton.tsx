"use client";
import React from "react";
import { Products } from "../../sanity.types"; // Ensure this is correctly imported
import useBasketStore from "../store/store"; // Ensure this is correctly imported

interface AddToBasketButtonProps {
  product: Products; // Product type
  disabled: boolean; // Whether the button should be disabled
}

const AddToBasketButton = ({ product, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id); // Get the current count of the product in the basket

  // Function to add an item to the basket (increase quantity by 1)
  const handleAddToBasket = () => {
    addItem(product);
  };

  // Function to remove an item from the basket (decrease quantity by 1)
  const handleRemoveFromBasket = () => {
    if (itemCount > 0) {
      removeItem(product._id); // Remove 1 item from the basket
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={handleRemoveFromBasket} // Decrease quantity by 1
        disabled={itemCount <= 0 || disabled} // Disable if no items in the basket
        className="text-2xl bg-red-500 text-white px-5 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="text-lg font-semibold">{itemCount}</span>{" "}
      {/* Display the count */}
      <button
        onClick={handleAddToBasket} // Increase quantity by 1
        disabled={disabled} // Disable if the button is disabled
         className="text-2xl bg-green-500 text-white px-5 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
};

export default AddToBasketButton;
