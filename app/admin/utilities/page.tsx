"use client";

import { PageTitle } from "@/components";
import { Amenities } from "@/app/admin/utilities/Amenities";
import { PriceChanges } from "@/app/admin/utilities/PriceChanges";
import { PaymentMethods } from "@/app/admin/utilities/PaymentMethods";

const Utilities = () => {
  return (
    <>
      <PageTitle isAdmin title="Ustawienia" />
      <main className="w-full max-w-screen-lg mx-auto my-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <Amenities />
        <PriceChanges />
        <PaymentMethods />
      </main>
    </>
  );
};

export default Utilities;
