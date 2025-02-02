import type { NextConfig } from "next";
import withNextIntl from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
};

const nextIntl = withNextIntl("./i18n.ts");

module.exports = nextIntl(nextConfig);