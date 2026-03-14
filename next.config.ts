import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://front-school.minio.ktsdev.ru/*')],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
