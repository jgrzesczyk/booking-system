"use client";

import { PageTitle } from "@/components";
import { message, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import { RoomForm } from "@/app/admin/rooms/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AmenityResponse } from "@/app/admin/utilities/types";
import { RoomEditForm } from "@/app/admin/rooms/RoomEditForm";
import { useRouter } from "next/navigation";

const NewRoom = () => {
  const [amenities, setAmenities] = useState<AmenityResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = useForm<RoomForm>();
  const { push } = useRouter();

  const fetchData = async () => {
    const res = await fetch("/api/admin/amenities", {
      method: "GET",
    });

    const data = await res.json();
    setAmenities(data);
  };

  const submitForm = async (
    setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  ) => {
    try {
      setIsSubmitting(true);
      await form.validateFields();
      const res = await fetch("/api/admin/rooms", {
        method: "POST",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        setIsSubmitting(false);
        push("/admin/rooms");
        message.success("Dodano pokój");
        return;
      }

      throw await res.json();
    } catch (e) {
      message.error(
        (e as { errorMsg: string })?.errorMsg ||
          "Wystąpił błąd, spróbuj ponownie",
      );
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchData();
      setIsLoading(false);
    })();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <Skeleton active />;
    }

    return (
      <RoomEditForm form={form} amenities={amenities} submitForm={submitForm} />
    );
  };

  return (
    <>
      <PageTitle isAdmin title="Nowy pokój" />
      <main className="w-full max-w-screen-lg mx-auto my-10 overflow-x-auto px-4">
        {renderData()}
      </main>
    </>
  );
};

export default NewRoom;
