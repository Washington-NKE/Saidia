import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
  domains: [
    "images.unsplash.com",
    "res.cloudinary.com",
    "firebasestorage.googleapis.com",
    "localhost",
  ],
},
typescript: {
  ignoreBuildErrors: true,
},
eslint: {
  ignoreDuringBuilds: true,
},
};

export default nextConfig;
