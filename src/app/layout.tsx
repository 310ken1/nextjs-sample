"use client";

import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

export const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-sans-jp",
  display: "swap",
  fallback: ["Hiragino Sans", "Hiragino Kaku Gothic ProN", "sans-serif"],
});

/**
 * ルートレイアウトコンポーネント.
 * @param children 子要素.
 * @returns ルートレイアウトコンポーネント.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
