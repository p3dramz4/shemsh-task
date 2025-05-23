import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shemsh",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa">
      <body className="antialiased">{children}</body>
    </html>
  );
}
