/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    URL_BACKEND:
      "https://renta-project-server-j3yis97bh-rentaproject.vercel.app/",
    URL_CLOUDINARY:
      "https://res.cloudinary.com/dnhoxflfj/image/upload/v1667823115/",
  },
};
const withImages = require("next-images");

module.exports = withImages();
module.exports = nextConfig;
