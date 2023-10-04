"use client";

import { PageTitle } from "@/components";
import { useSession } from "next-auth/react";

const Reservations = () => {
  const { data: session } = useSession();

  return (
    <>
      <PageTitle isAdmin title="Lista rezerwacji" />
      <main className="w-full max-w-screen-lg mx-auto my-10">
        <h2>Rezerwacje....</h2>
        <pre>{JSON.stringify(session)}</pre>
      </main>
    </>
  );
};

export default Reservations;
