import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cukiernia 3P",
  description: "Bartosz Geodecki cukerianrernia",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
