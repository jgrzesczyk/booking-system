"use client";

import { Layout } from "@/components";
import { ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <LayoutWrapped>{children}</LayoutWrapped>
    </SessionProvider>
  );
};

const LayoutWrapped = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  return (
    <Layout isAdmin isLoggedIn={!!session}>
      {children}
    </Layout>
  );
};

export default MainLayout;
