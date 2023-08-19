import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Footer, Header } from "@/components";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import "dayjs/locale/pl";
import dayjs from "dayjs";

import "../globals.css";
import "react-multi-carousel/lib/styles.css";
import { ReactNode } from "react";

dayjs.locale("pl");

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Wczasy "Pod Gruszą"',
  description: "Idealne miejsce na wakacje",
  icons: {
    icon: "/logo.png",
  },
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="pl">
      <body className={`min-h-screen ${font.className}`}>
        <Header.Subpage />
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;
