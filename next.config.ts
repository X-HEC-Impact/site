import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Ancienne adresse du hackathon du 16 octobre 2026, renommé « Hack for Good ».
  async redirects() {
    return [
      { source: '/evenements/hackathon-impact-2026', destination: '/evenements/hack-for-good-2026', permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
