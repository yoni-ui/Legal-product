import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Monorepo hoisting can break `next lint` on some machines; typecheck + CI still enforce quality.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
