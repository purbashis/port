/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/port',
    assetPrefix: '/port',
    trailingSlash: true,
    images: { unoptimized: true }
};

module.exports = nextConfig;
