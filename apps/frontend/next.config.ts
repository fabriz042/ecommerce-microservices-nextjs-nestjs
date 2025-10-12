import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAIN!,
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/es/productos/busqueda/:path*",
        destination: "/en/products/search/:path*",
      },
      {
        source: "/es/acerca",
        destination: "/en/about",
      },
    ];
  },
};

export default nextConfig;
