import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ['@phosphor-icons/react']
    },
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
};

export default nextConfig;
