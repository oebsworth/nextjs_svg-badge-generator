import type { Metadata } from "next";
import "@/styles/index.css";

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
      <body className={`antialiased`}      >
        {children}
      </body>
    </html>
  );
}
