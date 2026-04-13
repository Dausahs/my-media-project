import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Studio 24 | Premium Video Production",
  description: "High-end cinematic video production and event management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        {/* Navigation Wrapper - can be a separate component */}
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 py-4">
          <div className="container mx-auto px-6 flex justify-between items-center">
            <span className="text-xl font-bold tracking-tighter text-white">STUDIO<span className="text-neutral-500">24</span></span>
            <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-400">
              <a href="#showreel" className="hover:text-white transition-colors">Showreel</a>
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#booking" className="hover:text-white transition-colors">Booking</a>
            </div>
            <a href="#booking" className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors">
              Book Now
            </a>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-white/5 py-12 mt-24">
          <div className="container mx-auto px-6 text-center text-neutral-500 text-sm">
            © {new Date().getFullYear()} Studio24. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
