import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
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
        source: "/es/productos/:category",
        destination: "/en/products/:category",
      },
      {
        source: "/es/productos/:category/:path*",
        destination: "/en/products/:category/:path*",
      },
      {
        source: "/es/acerca",
        destination: "/en/about",
      },
    ];
  },
};

export default nextConfig;
