"use client";

import { Layout } from "@/components";
import { ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { AdminUser } from "@prisma/client";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <LayoutWrapped>{children}</LayoutWrapped>
    </SessionProvider>
  );
};

const LayoutWrapped = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const isLoggedIn = !!session;
  const isSuperUser = (session?.user as AdminUser)?.role === "SuperUser";

  return (
    <Layout isAdmin isLoggedIn={isLoggedIn} isSuperUser={isSuperUser}>
      {children}
    </Layout>
  );
};

export default MainLayout;
