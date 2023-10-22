import clsx from "clsx";
import { Checkbox, Form, Input, message, Select } from "antd";
import { FC } from "react";
import { AddReservationProps } from "@/app/admin/reservations/types";

export const AddReservationForm: FC<AddReservationProps> = ({
  data,
  roomsPreview,
  methodsData,
  fetchData,
}) => {
  const form = Form.useFormInstance();

  const addReservation = async () => {
    try {
      await form.validateFields();
      const res = await fetch("/api/admin/reservations", {
        method: "POST",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        await fetchData();
        form.resetFields();
        message.success("Dodano rezerwację");
        return;
      }

      throw await res.json();
    } catch (e) {
      message.error(
        (e as { errorMsg: string })?.errorMsg ||
          "Wystąpił błąd, spróbuj ponownie",
      );
    }
  };

  return (
    <tr className={clsx("border-b", data.length % 2 === 0 && "bg-gray-100")}>
      <td className="px-2 py-3"></td>
      <td className="px-2 py-3">
        <Form.Item
          name="roomId"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Select>
            {roomsPreview.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="dateFrom"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input type="date" />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="dateTo"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input type="date" />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="peopleNo"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input type="number" />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="price"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input type="number" />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="paymentMethodId"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Select>
            {methodsData.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="name"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="phone"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="email"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input type="email" />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="address"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="postalCode"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item
          name="city"
          rules={[{ required: true, message: "" }]}
          className="!mb-0"
        >
          <Input />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <Form.Item name="isActive" valuePropName="checked" className="!mb-0">
          <Checkbox />
        </Form.Item>
      </td>
      <td className="px-2 py-3">
        <button
          className="bg-green-800 rounded-md text-white border-white border-2 w-24 text-sm p-1"
          onClick={addReservation}
        >
          Dodaj
        </button>
      </td>
    </tr>
  );
};
