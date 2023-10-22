"use client";

import clsx from "clsx";
import { BsFillTrashFill } from "react-icons/bs";
import { Form, message, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { RxSwitch } from "react-icons/rx";
import { PaymentMethodsResponse } from "@/app/admin/utilities/types";
import { AiFillEdit } from "react-icons/ai";
import { PageTitle } from "@/components";
import dayjs from "dayjs";
import { ReservationResponse } from "@/app/admin/reservations/types";
import { Reservation } from "@prisma/client";
import { AddReservationForm } from "@/app/admin/reservations/AddReservationForm";

import styles from "./Reservations.module.scss";
import { EditReservationRow } from "@/app/admin/reservations/EditReservationRow";

const Reservations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ReservationResponse>([]);
  const [methodsData, setMethodsData] = useState<PaymentMethodsResponse>([]);
  const [roomsPreview, setRoomsPreview] = useState<
    { id: number; name: string }[]
  >([]);

  const [editData, setEditData] = useState<Reservation | null>(null);
  const [form] = useForm();

  const fetchData = async () => {
    const res = await fetch("/api/admin/reservations", {
      method: "GET",
    });

    const data = await res.json();
    setData(data);
  };

  const fetchMethods = async () => {
    const res = await fetch("/api/admin/payment-method", {
      method: "GET",
    });

    const data = await res.json();
    setMethodsData(data);
  };

  const fetchRoomsPreview = async () => {
    const res = await fetch("/api/admin/rooms/preview", {
      method: "GET",
    });

    const data = await res.json();
    setRoomsPreview(data);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      await fetchMethods();
      await fetchRoomsPreview();
      setIsLoading(false);
    })();
  }, []);

  const deleteReservation = async (id: number) => {
    const res = await fetch(`/api/admin/reservations/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Usunięto rezerwację");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };
  const toggleReservationPaid = async (id: number) => {
    const res = await fetch(`/api/admin/reservations/${id}/paid`, {
      method: "PUT",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Zmieniono płatność rezerwacji");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  const handleToggleEdit = (reservation: Reservation) => {
    setEditData(reservation);
  };

  const handleEditReservation = async () => {
    const keys: (keyof Reservation)[] = [
      "address",
      "name",
      "dateTo",
      "dateFrom",
      "roomId",
      "peopleNo",
      "email",
      "city",
      "isPaid",
      "phone",
      "price",
      "postalCode",
      "paymentMethodId",
    ];

    const data = keys.reduce(
      (obj, curr) => ({
        ...obj,
        [curr]: editData?.[curr],
      }),
      {},
    );

    const res = await fetch(`/api/admin/reservations/${editData?.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (res?.ok) {
      await fetchData();
      message.success("Zmieniono rezerwację");
      setEditData(null);
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  const renderData = () => {
    if (isLoading) {
      return <Skeleton active />;
    }

    return (
      <Form form={form}>
        <table className="w-full text-left rounded-md">
          <thead className="border-b-2">
            <tr>
              <th className="px-2 py-3">Lp.</th>
              <th className="px-2 py-3">Pokój</th>
              <th className="px-2 py-3">Od</th>
              <th className="px-2 py-3">Do</th>
              <th className="px-2 py-3">Osoby</th>
              <th className="px-2 py-3">Cena</th>
              <th className="px-2 py-3">Metoda płatności</th>
              <th className="px-2 py-3">Imię i nazwisko</th>
              <th className="px-2 py-3">Telefon</th>
              <th className="px-2 py-3">E-mail</th>
              <th className="px-2 py-3">Adres</th>
              <th className="px-2 py-3">Kod pocztowy</th>
              <th className="px-2 py-3">Miasto</th>
              <th className="px-2 py-3">Czy zapłacone</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item.id}
                className={clsx("border-b", i % 2 === 0 && "bg-gray-100")}
              >
                {item.id === editData?.id ? (
                  <EditReservationRow
                    data={editData}
                    setData={setEditData}
                    onSubmit={handleEditReservation}
                    index={i + 1}
                    methodsData={methodsData}
                    roomsPreview={roomsPreview}
                  />
                ) : (
                  <>
                    <td className="px-2 py-3">{i + 1}</td>
                    <td className="px-2 py-3">
                      {roomsPreview?.find((x) => x.id === item.roomId)?.name}
                    </td>
                    <td className="px-2 py-3">
                      {dayjs(item.dateFrom).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-2 py-3">
                      {dayjs(item.dateTo).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-2 py-3">{item.peopleNo}</td>
                    <td className="px-2 py-3">{`${item.price} zł`}</td>
                    <td className="px-2 py-3">
                      {
                        methodsData?.find((x) => x.id === item.paymentMethodId)
                          ?.name
                      }
                    </td>
                    <td className="px-2 py-3">{item.name}</td>
                    <td className="px-2 py-3">{item.phone}</td>
                    <td className="px-2 py-3">{item.email}</td>
                    <td className="px-2 py-3">{item.address}</td>
                    <td className="px-2 py-3">{item.postalCode}</td>
                    <td className="px-2 py-3">{item.city}</td>
                    <td className="px-2 py-3">{item.isPaid ? "Tak" : "Nie"}</td>
                    <td className="px-2 py-3">
                      <div className="flex gap-2">
                        <AiFillEdit
                          onClick={() => handleToggleEdit(item)}
                          className="cursor-pointer"
                        />
                        <RxSwitch
                          className="cursor-pointer"
                          onClick={() => toggleReservationPaid(item.id)}
                        />
                        <BsFillTrashFill
                          className="cursor-pointer"
                          onClick={() => deleteReservation(item.id)}
                        />
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}

            <AddReservationForm
              data={data}
              fetchData={fetchData}
              methodsData={methodsData}
              roomsPreview={roomsPreview}
            />
          </tbody>
        </table>
      </Form>
    );
  };

  return (
    <>
      <PageTitle isAdmin title="Lista rezerwacji" />
      <main
        className={`w-full max-w-screen-lg mx-auto my-10 overflow-x-auto ${styles.reservations}`}
      >
        {renderData()}
      </main>
    </>
  );
};

export default Reservations;
