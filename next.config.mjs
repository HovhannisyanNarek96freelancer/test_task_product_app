/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['picsum.photos'],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
};

export default nextConfig;
