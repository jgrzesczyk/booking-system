import { FC, useState } from "react";
import { Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RoomFormProps } from "@/app/admin/rooms/types";
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";

export const RoomEditForm: FC<RoomFormProps> = ({
  form,
  amenities,
  submitForm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <div className="flex flex-col">
      <Form
        form={form}
        layout="vertical"
        className="gap-8 flex flex-col md:flex-row"
      >
        <div className="flex-grow">
          <Form.Item
            label="Nazwa pokoju"
            rules={[{ required: true, message: "Pole jest wymagane." }]}
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Powierzchnia"
            rules={[
              { required: true, message: "Pole jest wymagane." },
              () => ({
                validator(_, value) {
                  return !(+value > 0)
                    ? Promise.reject("Powierzchnia musi być większa od 0.")
                    : Promise.resolve();
                },
              }),
            ]}
            name="area"
          >
            <Input
              type="number"
              suffix={
                <>
                  m<sup>2</sup>
                </>
              }
            />
          </Form.Item>
          <Form.Item
            label="Liczba osób"
            rules={[
              { required: true, message: "Pole jest wymagane." },
              () => ({
                validator(_, value) {
                  return !(+value > 0) || +value !== parseInt(value)
                    ? Promise.reject("Liczba osób musi być większa od 0.")
                    : Promise.resolve();
                },
              }),
            ]}
            name="peopleNo"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Opis łóżek"
            rules={[{ required: true, message: "Pole jest wymagane." }]}
            name="bedsDescription"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Opis"
            rules={[{ required: true, message: "Pole jest wymagane." }]}
            name="description"
          >
            <TextArea />
          </Form.Item>
          <Form.Item
            label="Cena"
            rules={[
              { required: true, message: "Pole jest wymagane." },
              () => ({
                validator(_, value) {
                  return !(+value > 0)
                    ? Promise.reject("Cena musi być większa od 0.")
                    : Promise.resolve();
                },
              }),
            ]}
            name="price"
          >
            <Input type="number" suffix="zł" />
          </Form.Item>
          <Form.Item
            label="Udogodnienia"
            rules={[{ required: true, message: "Pole jest wymagane." }]}
            name="amenities"
          >
            <Select
              mode="multiple"
              allowClear
              options={amenities.map(({ name, id }) => ({
                label: name,
                value: id,
              }))}
              optionFilterProp="label"
            />
          </Form.Item>
          <Form.Item
            label="Czy aktywny"
            name="isActive"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </div>
        <div className="flex-grow">Zdjęcia</div>
      </Form>

      <button
        className={clsx(
          "rounded-md p-2 w-32 mt-8 flex items-center justify-center gap-4 self-center",
          !isSubmitting &&
            "bg-blue-800 bg-opacity-80 text-white cursor-pointer",
          isSubmitting && "bg-gray-200",
        )}
        onClick={() => !isSubmitting && submitForm(setIsSubmitting)}
      >
        {isSubmitting && <FaSpinner />}
        <span>Zapisz</span>
      </button>
    </div>
  );
};
