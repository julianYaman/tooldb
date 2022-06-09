/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "img.shields.io", 
      "qrukfpaygglwznencwsz.supabase.co", 
      "ui-avatars.com", 
      "http.cat", 
      "dummyimage.com",
      "avatars.githubusercontent.com",
      "raw.githubusercontent.com",
      "camo.githubusercontent.com",
      "user-images.githubusercontent.com"
    ]
  }
}

module.exports = nextConfig
