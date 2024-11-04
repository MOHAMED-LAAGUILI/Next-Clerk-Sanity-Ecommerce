import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '', // You can leave this empty unless you need a specific port
                pathname: '/**', // This allows all paths under the hostname
            },
        ],
    },
};

export default nextConfig;