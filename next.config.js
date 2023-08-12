/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    experimental: {
        serverActions: true,
        typedRoutes: true,
    },
}

module.exports = nextConfig
