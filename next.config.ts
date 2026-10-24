import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Les articles Markdown sont lus au build ET dans la route OG dynamique :
  // on garantit qu'ils accompagnent le bundle des fonctions.
  outputFileTracingIncludes: {
    "/notes/(.*)": ["./src/content/notes/**/*.md"],
    "/feed.xml": ["./src/content/notes/**/*.md"],
  },
};

export default nextConfig;
