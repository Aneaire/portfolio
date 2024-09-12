/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
