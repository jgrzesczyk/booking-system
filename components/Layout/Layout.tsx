import { Open_Sans } from "next/font/google";
import { Footer, Header } from "@/components";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import theme from "@/theme/themeConfig";
import { ConfigProvider } from "antd";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { ReactNode } from "react";

import "../../app/globals.css";
import "react-multi-carousel/lib/styles.css";

dayjs.locale("pl");

const font = Open_Sans({ subsets: ["latin"] });

const Layout = ({
  children,
  isHomePage,
}: {
  children: ReactNode;
  isHomePage?: boolean;
}) => {
  return (
    <html lang="pl">
      <body className={`min-h-screen ${font.className}`}>
        {isHomePage ? <Header /> : <Header.Subpage />}
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
        <Footer />
      </body>
    </html>
  );
};

export default Layout;
