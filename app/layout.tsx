import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "House of Wander - Guided Stays",
  description:
    "A local prototype for the House of Wander collection gateway, with Casa Cabane as the first guided stay."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#11130f"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
