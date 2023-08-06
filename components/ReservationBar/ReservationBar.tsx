"use client";

import { FC, HTMLAttributes, useState } from "react";
import dayjs from "dayjs";
import CDatePicker from "@/components/CDatePicker/CDatePicker";
import CInputNumber from "@/components/CInputNumber/CInputNumber";
import { Form } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./ReservationBar.module.scss";

const ReservationBar: FC<HTMLAttributes<HTMLFormElement>> = ({
  className = "",
  ...props
}) => {
  const [form] = useForm();
  const [departureCalendarOpen, setDepartureCalendarOpen] = useState(false);

  const handleSubmit = () => {
    console.log(form.getFieldsValue());
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        arrival: dayjs(),
        departure: dayjs().add(1, "day"),
        people: 2,
      }}
      className={`static md:absolute flex justify-center border-y-4 md:border-y-0 border-green-800 border-opacity-80 md:left-1/2 md:-translate-x-1/2 md:bottom-5 bg-white bg-opacity-70 md:rounded-lg drop-shadow-2xl ${styles.reservationBarForm} ${className}`}
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
          <CDatePicker onSelect={() => setDepartureCalendarOpen(true)} />
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
        className="bg-green-800 bg-opacity-80 text-white text-sm md:text-base w-28 md:w-36"
        onClick={handleSubmit}
      >
        Rezerwuj
      </button>
    </Form>
  );
};

export default ReservationBar;
