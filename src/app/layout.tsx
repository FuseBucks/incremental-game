import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Incremental Game",
  description: "Virus go boom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
