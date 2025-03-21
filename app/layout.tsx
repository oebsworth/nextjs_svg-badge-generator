import type { Metadata } from "next";
import "@/styles/index.css";
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "SVG Badge Generator",
  description: "Generate SVG badges for your projects.",
};

type TRootLayoutProps = {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: TRootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}
