/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js hydration needs inline scripts; no remote scripts are used.
      "script-src 'self' 'unsafe-inline'",
      // Site uses styled-jsx/inline styles.
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      // Client components fetch our own /api/* routes only.
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Blog article pages read markdown files at runtime (ISR revalidation
    // calls getPostMerged -> fs). Next's file tracer cannot follow the
    // dynamic process.cwd()-based path, so without this the serverless
    // function ships without content/posts and every /blog/[slug] page
    // 404s after its first revalidation (regression from the 2026-11-16
    // database-backed blog change, commit 0c6e9f00).
    outputFileTracingIncludes: {
      "/blog/[slug]": ["./content/posts/**/*"],
      "/blog": ["./content/posts/**/*"],
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
