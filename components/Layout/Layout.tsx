import { Open_Sans } from "next/font/google";
import { Footer, Header } from "@/components";
import StyledComponentsRegistry from "../../lib/AntdRegistry";
import theme from "@/theme/themeConfig";
import { ConfigProvider, Menu, MenuProps } from "antd";
import "dayjs/locale/pl";
import dayjs from "dayjs";
import { ReactNode } from "react";

import "../../app/globals.css";
import "react-multi-carousel/lib/styles.css";
import { signOut } from "next-auth/react";
import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineCaretDown } from "react-icons/ai";
import Link from "next/link";

dayjs.locale("pl");

const font = Open_Sans({ subsets: ["latin"] });

const Layout = ({
  children,
  isHomePage,
  isAdmin,
  isLoggedIn,
  isSuperUser,
}: {
  children: ReactNode;
  isHomePage?: boolean;
  isAdmin?: boolean;
  isSuperUser?: boolean;
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

  const menuItems: MenuProps["items"] = [
    {
      key: "SubMenu",
      icon: (
        <AiOutlineCaretDown className="translate-x-2 -translate-y-1 rounded-md !text-white" />
      ),
      className: "!p-0 border-2 border-white w-8 !rounded-md text-white",
      children: [
        ...(isSuperUser
          ? [
              {
                label: (
                  <Link className="block" href="/admin/users">
                    Użytkownicy
                  </Link>
                ),
                key: "users",
              },
            ]
          : []),
        {
          label: (
            <Link className="block" href="/admin/reservations">
              Rezerwacje
            </Link>
          ),
          key: "reservations",
        },
        {
          label: (
            <Link className="block" href="/admin/rooms">
              Pokoje
            </Link>
          ),
          key: "rooms",
        },
        {
          label: (
            <Link className="block" href="/admin/utilities">
              Ustawienia
            </Link>
          ),
          key: "utilities",
        },
      ],
    },
  ];

  return (
    <html lang="pl">
      <body className={`min-h-screen ${font.className}`}>
        {isHomePage ? <Header /> : <Header.Subpage />}
        {isAdmin && isLoggedIn && (
          <>
            <SignOutButton />
            <Menu
              className="w-8 top-1 right-10 bg-green-800 rounded-md text-white !border-0 text-xl absolute"
              mode="horizontal"
              items={menuItems}
            />
          </>
        )}
        <StyledComponentsRegistry>
          <ConfigProvider theme={theme}>{children}</ConfigProvider>
        </StyledComponentsRegistry>
        <Footer isAdmin={isAdmin} />
      </body>
    </html>
  );
};

export default Layout;
