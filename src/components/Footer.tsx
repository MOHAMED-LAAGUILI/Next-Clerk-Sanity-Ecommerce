"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const { user } = useUser();

  return (
    <footer className="py-4 font-bold w-full shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Company Info */}
        <div className="mb-2 md:mb-0 text-center md:text-left">
          <h4 className="text-lg font-bold">Eshopr.eco</h4>
          <p className="text-sm">Your sustainable shopping destination.</p>
          {user && (
            <p className="mt-2 text-sm">Logged in as {user.fullName}!</p>
          )}
        </div>

        {/* Links */}
        <div className="flex flex-col md:flex-row md:space-x-6 mb-2 md:mb-0">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          <Link href="/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} className="h-6 w-6 text-gray-600 hover:text-blue-500 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} className="h-6 w-6 text-gray-600 hover:text-blue-400 transition" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6 text-gray-600 hover:text-pink-500 transition" />
          </a>
        </div>
      </div>

      <div className="text-center mt-2">
        <p className="text-sm">© {new Date().getFullYear()} Eshopr.eco. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
