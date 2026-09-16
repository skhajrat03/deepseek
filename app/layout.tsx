import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./prism.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

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
        <body className="min-h-full flex flex-col">
          <Toaster toastOptions={
            {
              success: {style:{background:"black", color:"white"}},
              error: {style:{background:"black", color:"white"}}
            }
          } />
          {children}</body>
      </html>
      </AppContextProvider>
    </ClerkProvider>
  );
}
