import type { NextConfig } from "next";

// Allow self-signed certificates from local WSO2 IS instance (dev only)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
