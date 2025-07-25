import "./globals.css";

import Header from "@/components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen">
        <Header />
        {children}
      </body>
    </html>
  );
}
