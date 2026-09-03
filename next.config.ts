import type { NextConfig } from "next";

/**
 * Arabic is the primary language and lives at the root of the site (lend.sa/).
 * English lives under /en. Internally every page is rendered from app/[locale],
 * so the root paths are rewritten to /ar and /ar itself redirects back to the
 * canonical root URL.
 */
const arabicRoutes = ["", "/privacy", "/terms"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    return {
      afterFiles: arabicRoutes.map((path) => ({
        source: path === "" ? "/" : path,
        destination: `/ar${path}`,
      })),
    };
  },
  async redirects() {
    return [
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
