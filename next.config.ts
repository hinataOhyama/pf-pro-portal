import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
    ]
  }
};

const nextIntl = withNextIntl("./src/lib/i18n.ts");

module.exports = nextIntl(nextConfig);