/** @type {import('next').NextConfig} */

const config = {
  images: {
    remotePatterns: [{ hostname: 'cdn.sanity.io' }],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default config
