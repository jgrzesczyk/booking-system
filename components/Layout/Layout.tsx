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
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";

dayjs.locale("pl");

const font = Open_Sans({ subsets: ["latin"] });

const Layout = ({
  children,
  isHomePage,
  isAdmin,
  isLoggedIn,
}: {
  children: ReactNode;
  isHomePage?: boolean;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}) => {
  const SignOutButton = () => (
    <button
      className="absolute right-1 top-1 bg-green-800 rounded-md text-white border-white border-2 text-xl p-1"
      onClick={() => signOut()}
    >
      <HiOutlineLogout />
    </button>
  );

  return (
    <html lang="pl">
      <body className={`min-h-screen ${font.className}`}>
        {isHomePage ? <Header /> : <Header.Subpage />}
        {isAdmin && isLoggedIn && <SignOutButton />}
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
        <Footer isAdmin={isAdmin} />
      </body>
    </html>
  );
};

export default Layout;
