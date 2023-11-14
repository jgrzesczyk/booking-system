import { Layout } from "@/components";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Wczasy "Pod Gruszą"',
  description: "Idealne miejsce na wakacje",
  icons: {
    icon: "https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk",
  },
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default MainLayout;
