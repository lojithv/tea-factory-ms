/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true
    },
    images: {
      domains: ['schojrtyfyhntmwbpfvj.supabase.co'],
    },
    swcMinify:true
}

module.exports = nextConfig
