"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AmenityResponse } from "@/app/admin/utilities/types";
import { useForm } from "antd/es/form/Form";
import { RoomDetailsResponse, RoomForm } from "@/app/admin/rooms/types";
import { useRouter } from "next/navigation";
import { message, Skeleton } from "antd";
import { RoomEditForm } from "@/app/admin/rooms/RoomEditForm";
import { PageTitle } from "@/components";

const RoomView = ({ params }: { params: { id: number } }) => {
  const [amenities, setAmenities] = useState<AmenityResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form] = useForm<RoomForm>();
  const { push } = useRouter();

  const fetchAmenities = async () => {
    const res = await fetch("/api/admin/amenities", {
      method: "GET",
    });

    const data = await res.json();
    setAmenities(data);
  };

  const fetchRoom = async () => {
    const res = await fetch(`/api/admin/rooms/${+params.id}`, {
      method: "GET",
    });

    const data = await res.json();
    if (!data) {
      return push("/admin/rooms");
    }

    setIsLoading(false);
    return data;
  };

  const submitForm = async (
    setIsSubmitting: Dispatch<SetStateAction<boolean>>,
  ) => {
    try {
      setIsSubmitting(true);
      await form.validateFields();
      const res = await fetch(`/api/admin/rooms/${params.id}`, {
        method: "PUT",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        setIsSubmitting(false);
        push("/admin/rooms");
        message.success("Edytowano pomyślnie pokój");
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

  const setFormData = (roomObject: RoomDetailsResponse) => {
    form.setFieldsValue({
      area: roomObject.area,
      isActive: roomObject.isActive,
      peopleNo: roomObject.peopleNo,
      price: roomObject.price,
      name: roomObject.name,
      description: roomObject.description,
      bedsDescription: roomObject.bedsDescription,
      amenities: roomObject.amenities.map((x) => x.id),
    });
  };

  useEffect(() => {
    (async () => {
      await fetchAmenities();
      const room = await fetchRoom();
      setFormData(room);
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
      <PageTitle isAdmin title="Edycja pokoju" />
      <main className="w-full max-w-screen-lg mx-auto my-10 overflow-x-auto px-4">
        {renderData()}
      </main>
    </>
  );
};

export default RoomView;
