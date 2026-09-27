import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fija la raíz del proyecto (evita que Turbopack tome un package-lock.json de una carpeta superior).
  turbopack: { root: __dirname },
};

export default nextConfig;
