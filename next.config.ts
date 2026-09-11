import type { NextConfig } from "next";

/**
 * Arabic is the primary language and is served from app/(ar) at the site root.
 * English is served from app/(en)/en. Both are real routes with their own root
 * layout, so no rewrites are needed; the old /ar prefix redirects to the root.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
