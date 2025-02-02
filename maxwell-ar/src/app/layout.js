import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://aframe.io/releases/1.3.0/aframe.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
