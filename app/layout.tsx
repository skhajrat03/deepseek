import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import "./globals.css";

const inter = Inter({
  weight: "400",
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "DeepSeek",
  description: "Full Stack Project",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <AppContextProvider>
      <html
        lang="en"
        className={`${inter.className} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
