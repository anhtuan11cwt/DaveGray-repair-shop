import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

// Font Inter với CSS variable để sử dụng trong Tailwind
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Metadata cho SEO - tiêu đề và mô tả trang
export const metadata: Metadata = {
  title: {
    template: "%s | Cửa Hàng Sửa Chữa Máy Tính",
    default: "Cửa Hàng Sửa Chữa Máy Tính",
  },
  description: "Cửa Hàng Sửa Chữa Máy Tính - Dịch Vụ Sửa Chữa Chuyên Nghiệp",
  applicationName: "Cửa Hàng Sửa Chữa Máy Tính",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
