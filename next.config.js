/** @type {import('next').NextConfig} */

const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL + "/storage");

const config = {
  images: {
    remotePatterns: [
      {
        protocol: baseUrl.protocol.replace(":", ""),
        hostname: baseUrl.hostname,
        port: baseUrl.port,
        pathname: baseUrl.pathname + "/**",
      },

      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**/**",
      },
    ],
  },
  swcMinify: true,
  reactStrictMode: false,
  output: "standalone",
  experimental: {
    appDir: false,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: "/docs",
        destination: "/docs/welcome",
        permanent: true,
      },
    ];
  },
};

// Remove this if you're not using Fullcalendar features
const withTM = require("next-transpile-modules")([
  "@fullcalendar/common",
  "@fullcalendar/react",
  "@fullcalendar/daygrid",
  "@fullcalendar/list",
  "@fullcalendar/timegrid",
  "@fullcalendar/timeline",
]);

module.exports = withTM(config);
