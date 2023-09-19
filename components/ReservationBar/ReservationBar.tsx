"use client";

import { FC, HTMLAttributes, useEffect, useState } from "react";
import dayjs from "dayjs";
import CDatePicker from "@/components/CDatePicker/CDatePicker";
import CInputNumber from "@/components/CInputNumber/CInputNumber";
import { Form, FormInstance } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./ReservationBar.module.scss";
import clsx from "clsx";
import { ReservationBarData } from "@/app/(other-pages)/reserve/room-choose/types";
import { useRouter } from "next/navigation";

const initFormData: ReservationBarData = {
  arrival: dayjs(),
  departure: dayjs().add(1, "day"),
  people: 2,
};

const ReservationBar: FC<
  HTMLAttributes<HTMLFormElement> & {
    isFormItem?: boolean;
    initValues?: ReservationBarData | null;
    handleSubmit?: (form: FormInstance<ReservationBarData>) => void;
  }
> = ({ isFormItem, handleSubmit, initValues, className = "", ...props }) => {
  const router = useRouter();
  const [form] = useForm();
  const [departureCalendarOpen, setDepartureCalendarOpen] = useState(false);

  const defaultHandleSubmit = (form: FormInstance<ReservationBarData>) => {
    localStorage.setItem(
      "reservationData",
      JSON.stringify(form.getFieldsValue()),
    );
    router.push("/reserve/room-choose");
  };

  useEffect(() => {
    if (isFormItem) {
      (handleSubmit || defaultHandleSubmit)(form);
    }
  }, [form, isFormItem]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initValues || initFormData}
      className={clsx(
        "flex justify-center border-y-4 md:border-y-0 border-green-800 border-opacity-80 bg-white bg-opacity-70 md:rounded-lg drop-shadow-2xl",
        isFormItem && "border-x-2 border-y-2 rounded-md overflow-hidden",
        styles.reservationBarForm,
        className,
      )}
      {...props}
    >
      <div className="flex md:py-1.5">
        <Form.Item
          name="arrival"
          label={
            <div className="uppercase text-xs md:text-sm text-center">
              Przyjazd
            </div>
          }
          className="flex items-center flex-col w-28 md:w-36 !mb-0"
        >
          <CDatePicker
            onSelect={(day) => {
              form.setFieldValue("departure", day.add(1, "day"));
              setDepartureCalendarOpen(true);
            }}
          />
        </Form.Item>
        <Form.Item
          name="departure"
          label={
            <div className="uppercase text-xs md:text-sm text-center">
              Wyjazd
            </div>
          }
          className="flex items-center flex-col w-28 md:w-36 !mb-0"
        >
          <CDatePicker
            open={departureCalendarOpen}
            onOpenChange={setDepartureCalendarOpen}
          />
        </Form.Item>
        <Form.Item
          name="people"
          label={
            <div className="uppercase text-xs md:text-sm text-center">
              Liczba osób
            </div>
          }
          className="items-center flex-col hidden md:flex w-36 !mb-0"
        >
          <CInputNumber min={1} max={6} />
        </Form.Item>
      </div>
      <button
        className="bg-green-800 bg-opacity-80 text-white md:rounded-r-lg text-sm md:text-base w-28 md:w-36"
        onClick={() => (handleSubmit || defaultHandleSubmit)(form)}
      >
        {isFormItem ? "Wyszukaj" : "Rezerwuj"}
      </button>
    </Form>
  );
};

export default ReservationBar;
