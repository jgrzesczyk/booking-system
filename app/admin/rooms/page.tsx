"use client";

import { PageTitle } from "@/components";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { PreviewRow } from "@/app/admin/rooms/PreviewRow";
import { RoomResponse } from "@/app/admin/rooms/types";
import Link from "next/link";

const Rooms = () => {
  const [data, setData] = useState<RoomResponse>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const res = await fetch("/api/admin/rooms", {
      method: "GET",
    });

    const data = await res.json();
    setData(data);
  };

  const renderData = () => {
    if (isLoading) {
      return <Skeleton active />;
    }

    return (
      <table className="w-full text-left rounded-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-2 py-3">Lp.</th>
            <th className="px-2 py-3">Nazwa</th>
            <th className="px-2 py-3">Powierzchnia</th>
            <th className="px-2 py-3">Liczba osób</th>
            <th className="px-2 py-3">Łóżka</th>
            <th className="px-2 py-3">Cena bazowa</th>
            <th className="px-2 py-3">Czy aktywny</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <PreviewRow
              key={item.id}
              row={item}
              index={i}
              fetchData={fetchData}
            />
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <PageTitle isAdmin title="Pokoje" />
      <main className="w-full max-w-screen-lg mx-auto my-10 overflow-x-auto flex flex-col gap-4">
        <Link
          className="bg-blue-800 bg-opacity-80 rounded-md text-white border-white p-2 inline-block self-end"
          href="/admin/rooms/new"
        >
          Dodaj nowy
        </Link>
        {renderData()}
      </main>
    </>
  );
};

export default Rooms;
