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
  // Blog article pages read markdown files at runtime (ISR revalidation
  // calls getPostMerged -> fs). Next's file tracer cannot follow the
  // dynamic process.cwd()-based path, so without this the serverless
  // function ships without content/posts and /blog/[slug] pages can 404
  // after revalidation. (Next 16: top-level key, not experimental.)
  outputFileTracingIncludes: {
    "/blog/[slug]": ["./content/posts/**/*"],
    "/blog": ["./content/posts/**/*"],
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
