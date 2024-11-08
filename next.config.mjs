// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("formidable");
    return config;
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    domains: ["res.cloudinary.com"], // Replace with your external image domain
  },
};

export default nextConfig;
