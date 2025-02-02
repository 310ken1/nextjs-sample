"use client";

import { Noto_Sans_JP } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-sans-jp",
  display: "swap",
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
    <html lang="ja">
      <body className={notoSansJp.className}>{children}</body>
    </html>
  );
}
