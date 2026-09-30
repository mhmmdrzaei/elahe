/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './sanity/lib/imageLoader.js',
  },
}

export default nextConfig
