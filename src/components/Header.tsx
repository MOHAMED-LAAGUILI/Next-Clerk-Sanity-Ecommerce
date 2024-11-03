"use client";

import { useState } from "react";
import { ClerkLoaded, SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { PackageIcon, TrolleyIcon, SearchIcon } from "@sanity/icons";
import ThemeToggle from "./ThemeToggle";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const { user } = useUser();
  const clerk = useClerk();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Toggles the mobile menu
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Create Clerk Passkey
  const createClerkPasskey = async () => {
    setLoading(true);
    try {
      const response = await user?.createPasskey();
      console.log(response);
      toast.success("Passkey created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
        
      console.error(`Error creating passkey: ${e}`);
      toast.error(`Error creating passkey: ${e}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg">
      <ToastContainer />
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-blue-600 dark:text-blue-300 transition transform hover:scale-105">
        Eshopr.eco
        </Link>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="block sm:hidden" aria-label="Toggle mobile menu">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-gray-200 hover:text-blue-600 transition duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Search Input */}
        <Form action="/search" className="hidden sm:flex flex-grow max-w-xl">
          <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
            <input
              type="text"
              name="query"
              placeholder="Search a product..."
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition"
            />
            <button className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition" aria-label="Search">
              <SearchIcon />
            </button>
          </div>
        </Form>

        {/* Desktop Links */}
        <div className="hidden sm:flex items-center space-x-6">
          {/* Basket Link */}
          <Link href="/basket" className="flex items-center text-gray-800 dark:text-gray-200 hover:text-blue-600 transition" aria-label="View basket">
            <TrolleyIcon className="mr-1 h-6 w-6" />
            <span>Basket</span>
          </Link>

          {/* User Section */}
          <ClerkLoaded>
            {user ? (
              <>
                <Link href="/orders" className="flex items-center text-gray-800 dark:text-gray-200 hover:text-blue-600 transition" aria-label="View orders">
                  <PackageIcon className="mr-1 h-6 w-6" />
                  <span>Orders</span>
                </Link>
                <UserButton />
                <div className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Welcome back, {user.firstName}!
                </div>
                
              </>
            ) : (
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <SignInButton mode="modal">Sign In</SignInButton>
              </div>
            )}
          </ClerkLoaded>

          {/* Passkey Creation Button */}
          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
              aria-label="Create Passkey"
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span>Create Passkey</span>
              )}
            </button>
          )}

          {/* Dark Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"} bg-white dark:bg-gray-800 shadow-md mt-2`}>
        <div className="flex flex-col px-6 py-4">
          <Form action="/search" className="mb-4">
            <input
              type="text"
              name="query"
              placeholder="Search a product..."
              className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 transition"
            />
          </Form>
          <Link href="/basket" className="py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 transition flex items-center" aria-label="View basket">
            <TrolleyIcon className="inline mr-1" />
            Basket
          </Link>
          <ClerkLoaded>
            {user ? (
              <>
                <Link href="/orders" className="py-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 transition flex items-center" aria-label="View orders">
                  <PackageIcon className="inline mr-1" />
                  Orders
                </Link>
                <div className="flex items-center py-2 text-gray-800 dark:text-gray-200">
                  <UserButton />
                  <div className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                    Welcome back, {user.firstName}!
                  </div>
                </div>
              
              </>
            ) : (
              <div className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <SignInButton mode="modal">Sign In</SignInButton>
              </div>
            )}
          </ClerkLoaded>

          {/* Passkey Creation Button in Mobile Menu */}
          {user?.passkeys.length === 0 && (
            <button
              onClick={createClerkPasskey}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              aria-label="Create Passkey"
              disabled={loading}
            >
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span>Create Passkey</span>
              )}
            </button>
          )}

          {/* Dark Mode Toggle */}
          <ThemeToggle />
          
        </div>
      </div>
    </header>
  );
};

export default Header;
