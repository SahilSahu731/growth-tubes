import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css"; // your global CSS file

const lato = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: {
    default: "Growth Tube - Personal Development Platform",
    template: "%s | Growth Tube"
  },
  description: "Transform your life with Growth Tube - the ultimate platform for personal development, learning, and growth.",
  keywords: ["personal development", "learning", "growth", "education", "self improvement"],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Growth Tube - Personal Development Platform",
    description: "Transform your life with Growth Tube - the ultimate platform for personal development, learning, and growth.",
    siteName: "Growth Tube",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth Tube - Personal Development Platform",
    description: "Transform your life with Growth Tube - the ultimate platform for personal development, learning, and growth.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
