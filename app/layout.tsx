import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Footer, Header } from "@/components";
import { ReactNode } from "react";
import StyledComponentsRegistry from "../lib/AntdRegistry";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Wczasy "Pod Gruszą"',
  description: "Idealne miejsce na wakacje",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body className={`min-h-screen ${font.className}`}>
        <Header />
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
        <Footer />
      </body>
    </html>
  );
}
