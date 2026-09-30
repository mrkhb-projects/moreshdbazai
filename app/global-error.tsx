"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("خطای بحرانی برنامه:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          backgroundColor: "#0b0c10",
          color: "#eceef2",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>خطای غیرمنتظره</h1>
        <p style={{ maxWidth: 420, color: "#8b93a3", fontSize: "0.9rem" }}>
          متاسفانه برنامه با یک خطای جدی مواجه شد. لطفاً صفحه را دوباره بارگذاری کنید.
        </p>
        <button
          onClick={reset}
          style={{
            backgroundColor: "#18ac7c",
            color: "#0b0c10",
            border: "none",
            borderRadius: "0.75rem",
            padding: "0.6rem 1.5rem",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          تلاش دوباره
        </button>
      </body>
    </html>
  );
}
