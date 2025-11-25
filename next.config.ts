import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    // Include your custom Prisma client output folder
    // Adjust the path to match your real structure
    "/*": ["./app/generated/prisma/**/*"],
    "/api/*": ["./app/generated/prisma/**/*"],
  },
};

export default nextConfig;
