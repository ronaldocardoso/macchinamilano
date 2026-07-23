import type { NextConfig } from "next";

const isStaticHosting = process.env.DEPLOY_TARGET === "static";

const nextConfig: NextConfig = {
  ...(isStaticHosting
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
