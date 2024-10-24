/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    experimental: {
        typedRoutes: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.pexels.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "kr.object.ncloudstorage.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
            child_process: false,
            worker_threads: false,
            inspector: false,  // 추가된 inspector
        };
        return config;
    },
};

module.exports = nextConfig;
