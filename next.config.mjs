/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tochigisc.jp",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
