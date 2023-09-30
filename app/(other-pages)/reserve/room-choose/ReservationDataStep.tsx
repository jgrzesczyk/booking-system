import { FC, useContext, useEffect, useState } from "react";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { Form, Input, message, Radio, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import { useWatch } from "rc-field-form";
import { RoomReservationPreview } from "../../../../components";
import { ReservationDataForm } from "@/app/(other-pages)/reserve/room-choose/types";
import { PaymentMethod } from ".prisma/client";
import { Room } from "@prisma/client";

const ReservationDataStep: FC<{
  setIsValid: (val: boolean) => void;
}> = ({ setIsValid }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [roomDetails, setRoomDetails] = useState<
    (Room & { fullPrice: number }) | null
  >(null);
  const [form] = useForm();
  const context = useContext(RoomChooseContext);

  const formValues: ReservationDataForm = useWatch([], form);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch("/api/reserve/payment-method"),
      fetch("/api/reserve/details", {
        method: "post",
        body: JSON.stringify({
          arrival: context?.barData?.arrival,
          departure: context?.barData?.departure,
          roomId: context?.roomId,
        }),
      }),
    ])
      .then((data) => data.map((d) => d.json()))
      .then(async ([methodsPromise, detailsPromise]) => {
        const paymentMethods = await methodsPromise;
        const roomDetails = await detailsPromise;

        setPaymentMethods(paymentMethods);
        setRoomDetails(roomDetails);
      })
      .then(() => setIsLoading(false))
      .catch(() => message.error("Wystąpił błąd, spróbuj ponownie później."));
  }, [context?.barData, context?.roomId]);

  useEffect(() => {
    if (!formValues || !form.isFieldsTouched(Object.keys(formValues), true))
      return;

    context?.setFormData(formValues);

    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [formValues]);

  if (isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
      <Form className="flex-1" form={form} layout="vertical">
        <Form.Item
          label="Forma płatności"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
          name="paymentType"
        >
          <Radio.Group>
            {paymentMethods.map(({ name, isActive, id }) => (
              <Radio.Button key={id} value={id} disabled={!isActive}>
                {name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Imię i nazwisko"
          name="name"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefon"
          name="phone"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Adres e-mail"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Email jest nieprawidłowy.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Adres"
          name="address"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kod pocztowy"
          name="postalCode"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Miasto"
          name="city"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <div className="flex-1">
        {roomDetails && <RoomReservationPreview room={roomDetails} />}
      </div>
    </div>
  );
};

export default ReservationDataStep;
