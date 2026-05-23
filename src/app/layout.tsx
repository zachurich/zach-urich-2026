import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zach Urich for State Senate 2026",
  description: "Zach Urich for State Senate 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
