import { withContentlayer } from "next-contentlayer";
// import { verifyPatch } from "next-ws/server/index.js";

import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "mdx", "ts", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "jterrencemedia.wordpress.com"
      }
    ],
  },
};

// verifyPatch();

export default withContentlayer(nextConfig);