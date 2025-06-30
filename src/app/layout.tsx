import type { Metadata, Viewport } from "next";
import { HealthcareProvider } from "../contexts/HealthcareContext";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Healthcare Assistant",
  description:
    "AI-powered healthcare application with emergency guides and patient questionnaires",
  keywords: ["healthcare", "AI", "medical", "emergency", "questionnaire"],
  authors: [{ name: "Healthcare Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#14b8a6",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta
          name="apple-mobile-web-app-title"
          content="Healthcare Assistant"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#14b8a6" />
        <meta name="theme-color" content="#14b8a6" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="scrollbar-healthcare">
        <HealthcareProvider>
          <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-purple-100">
            {children}
          </div>
        </HealthcareProvider>
      </body>
    </html>
  );
}
