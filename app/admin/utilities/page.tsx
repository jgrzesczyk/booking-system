"use client";

import { PageTitle } from "@/components";
import { Amenities } from "@/app/admin/utilities/Amenities";
import { PriceChanges } from "@/app/admin/utilities/PriceChanges";
import { PaymentMethods } from "@/app/admin/utilities/PaymentMethods";

import styles from "./Utilities.module.scss";
import { useEffect, useState } from "react";
import {
  AmenityResponse,
  PaymentMethodsResponse,
} from "@/app/admin/utilities/types";
import { PriceChange } from "@prisma/client";
import { Skeleton } from "antd";

const Utilities = () => {
  const [amenities, setAmenities] = useState<AmenityResponse>([]);
  const [priceChanges, setPriceChanges] = useState<PriceChange[]>([]);
  const [methods, setMethods] = useState<PaymentMethodsResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAmenities = async () => {
    const res = await fetch("/api/admin/amenities", {
      method: "GET",
    });

    const amenities = await res.json();
    setAmenities(amenities);
  };

  const fetchMethods = async () => {
    const res = await fetch("/api/admin/payment-method", {
      method: "GET",
    });

    const data = await res.json();
    setMethods(data);
  };

  const fetchPrices = async () => {
    const res = await fetch("/api/admin/price-change", {
      method: "GET",
    });

    const data = await res.json();
    setPriceChanges(data);
  };

  useEffect(() => {
    (async () => {
      await fetchAmenities();
      await fetchMethods();
      await fetchPrices();
      setIsLoading(false);
    })();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="col-span-2" active />;
    }

    return (
      <>
        <Amenities data={amenities} fetchData={fetchAmenities} />
        <PriceChanges data={priceChanges} fetchData={fetchPrices} />
        <PaymentMethods data={methods} fetchData={fetchMethods} />
      </>
    );
  };

  return (
    <>
      <PageTitle isAdmin title="Ustawienia" />
      <main
        className={`w-full max-w-screen-lg mx-auto my-10 grid grid-cols-1 lg:grid-cols-2 gap-16 ${styles.utilitiesPage}`}
      >
        {renderContent()}
      </main>
    </>
  );
};

export default Utilities;
