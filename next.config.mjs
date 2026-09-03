/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tochigisc.jp",
        pathname: "/upload/Sponsor/images/**",
      },
      {
        protocol: "https",
        hostname: "www.tochigisc.jp",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
