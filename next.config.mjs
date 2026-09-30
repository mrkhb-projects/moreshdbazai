/** @type {import('next').NextConfig} */
const nextConfig = {
  // این پروژه دقیقاً با «next build» و «next start» اجرا می‌شود؛ همان چیزی
  // که پلتفرم Next.js لیارا به‌صورت پیش‌فرض انتظار دارد (بدون نیاز به Docker
  // یا سرور سفارشی).
  poweredByHeader: false,
  reactStrictMode: true,

  images: {
    // فعلاً هیچ تصویر ریموتی از دامنه خارجی بارگذاری نمی‌شود.
    remotePatterns: [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
