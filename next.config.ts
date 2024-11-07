import type { NextConfig } from 'next';
import dotenv from 'dotenv';

// Load environment variables from .env.local or other env files
dotenv.config();  // Automatically loads .env, .env.local, etc.

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',              // The protocol (Sanity uses HTTPS for its CDN)
        hostname: 'cdn.sanity.io',      // The CDN hostname where Sanity images are hosted
        port: '',                       // No specific port required for Sanity
        pathname: '/**',                // This wildcard allows all paths under the hostname
      },
    ],
  },
  
  // Expose environment variables to the client-side
  env: {
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,  // Secret key for server-side use
    STRIPE_WEB_HOOK_SECRET: process.env.STRIPE_WEB_HOOK_SECRET,  // Secret key for server-side use

    // Sanity Studio Read Variables (for server-side)
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
    SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_API_KEY: process.env.SANITY_API_KEY,
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
    SANITY_API_EDITOR_TOKEN: process.env.SANITY_API_EDITOR_TOKEN,
    NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    // Clerk Integration Variables (for server-side)
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  },

  // Other Next.js configurations can go here if needed
};

export default nextConfig;
