import clsx from "clsx";
import { BsFillTrashFill } from "react-icons/bs";
import { Form, Input, message } from "antd";
import { AmenityResponse, UtilitiesSection } from "@/app/admin/utilities/types";
import { useForm } from "antd/es/form/Form";

export const Amenities: UtilitiesSection = ({ data: amenities, fetchData }) => {
  const [form] = useForm();

  const addAmenity = async () => {
    try {
      await form.validateFields();

      const res = await fetch("/api/admin/amenities", {
        method: "POST",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        await fetchData();
        form.resetFields();
        message.success("Dodano udogodnienie");
        return;
      }

      throw await res.json();
    } catch {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  const deleteAmenity = async (id: number) => {
    const res = await fetch(`/api/admin/amenities/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Usunięto udogodnienie");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <h3 className="mb-6 text-lg">Wyposażenie</h3>
      <table className="w-full text-left rounded-md">
        <thead className="border-b-2">
          <tr>
            <th className="px-2 py-3">Lp.</th>
            <th className="px-2 py-3">Nazwa</th>
            <th className="px-2 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {(amenities as AmenityResponse).map((amenity, i) => (
            <tr
              key={amenity.id}
              className={clsx("border-b", i % 2 === 0 && "bg-gray-100")}
            >
              <td className="px-2 py-3">{i + 1}</td>
              <td className="px-2 py-3">{amenity.name}</td>
              <td className="px-2 py-3">
                {!amenity.isUsed && (
                  <BsFillTrashFill
                    className="cursor-pointer"
                    onClick={() => deleteAmenity(amenity.id)}
                  />
                )}
              </td>
            </tr>
          ))}
          <tr
            className={clsx(
              "border-b",
              amenities.length % 2 === 0 && "bg-gray-100",
            )}
          >
            <td className="px-2 py-3"></td>
            <td className="px-2 py-3">
              <Form form={form}>
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <Input />
                </Form.Item>
              </Form>
            </td>
            <td className="px-2 py-3">
              <button
                className="bg-green-800 rounded-md text-white border-white border-2 w-24 text-sm p-1"
                onClick={addAmenity}
              >
                Dodaj
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
