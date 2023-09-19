import { FC, useContext, useEffect } from "react";
import { RoomChooseContext } from "@/app/(other-pages)/reserve/room-choose/_context";
import { Form, Input, Radio } from "antd";
import { useForm } from "antd/es/form/Form";
import { useWatch } from "rc-field-form";
import { RoomReservationPreview } from "../../../../components";
import { ReservationDataForm } from "@/app/(other-pages)/reserve/room-choose/types";

const ReservationDataStep: FC<{
  setIsValid: (val: boolean) => void;
}> = ({ setIsValid }) => {
  const [form] = useForm();
  const context = useContext(RoomChooseContext);

  const formValues: ReservationDataForm = useWatch([], form);

  useEffect(() => {
    if (!formValues || !form.isFieldsTouched(Object.keys(formValues), true))
      return;

    context?.setFormData(formValues);

    form
      .validateFields()
      .then(() => setIsValid(true))
      .catch(() => setIsValid(false));
  }, [formValues]);

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
      <Form className="flex-1" form={form} layout="vertical">
        <Form.Item
          label="Forma płatności"
          rules={[{ required: true, message: "Pole jest wymagane." }]}
          name="paymentForm"
        >
          <Radio.Group>
            <Radio.Button value="transfer">Przelew</Radio.Button>
            <Radio.Button disabled value="payu">
              PayU
            </Radio.Button>
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
        <RoomReservationPreview />
      </div>
    </div>
  );
};

export default ReservationDataStep;
