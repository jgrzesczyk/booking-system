import { FC, useState } from "react";
import { Form, Input, Select, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { RoomFormProps } from "@/app/admin/rooms/types";
import { FaSpinner } from "react-icons/fa";
import clsx from "clsx";
import { CldImage } from "next-cloudinary";
import { MdCancel } from "react-icons/md";
import { useWatch } from "rc-field-form";
import styles from "./RoomEditForm.module.scss";

export const RoomEditForm: FC<RoomFormProps> = ({
  form,
  amenities,
  submitForm,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const photos = useWatch("photos", form);

  return (
    <div className="flex flex-col">
      <Form
        form={form}
        layout="vertical"
        className="gap-8 flex flex-col md:flex-row"
      >
        <div className="flex-1">
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
        <div className="flex-1 flex flex-col gap-4">
          {photos?.length
            ? photos.map((item) => (
                <div key={item} className="h-64 relative">
                  <CldImage
                    className="object-cover"
                    fill
                    src={item}
                    alt="Widok pokoju"
                  />
                  <MdCancel
                    className="absolute top-1 right-1 w-6 h-6 cursor-pointer fill-green-800"
                    onClick={() =>
                      form.setFieldValue(
                        "photos",
                        photos.filter((name) => item !== name),
                      )
                    }
                  />
                </div>
              ))
            : "Brak dodanych zdjęć"}

          <Form.Item
            className={styles.photoField}
            name="photos"
            rules={[
              {
                message: "Co najmniej jedno zdjęcie jest wymagane.",
                validator: (_, value) => {
                  return value?.length
                    ? Promise.resolve()
                    : Promise.reject("Debil");
                },
              },
            ]}
          />
        </div>
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
