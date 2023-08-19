import { Layout } from "@/components";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Wczasy "Pod Gruszą"',
  description: "Idealne miejsce na wakacje",
  icons: {
    icon: "/logo.png",
  },
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  return <Layout isHomePage>{children}</Layout>;
};

export default MainLayout;
