import clsx from "clsx";
import { BsFillTrashFill } from "react-icons/bs";
import { Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { UtilitiesSection } from "@/app/admin/utilities/types";
import { PriceChange } from "@prisma/client";

export const PriceChanges: UtilitiesSection = ({ data, fetchData }) => {
  const [form] = useForm();

  const addPriceChange = async () => {
    try {
      await form.validateFields();
      const res = await fetch("/api/admin/price-change", {
        method: "POST",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        await fetchData();
        form.resetFields();
        message.success("Dodano zmianę cen");
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

  const deletePriceChange = async (id: number) => {
    const res = await fetch(`/api/admin/price-change/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Usunięto zmianę cen");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  return (
    <div className="col-span-2 lg:col-span-1">
      <h3 className="mb-6 text-lg">
        Zniżki/zwyżki sezonowe (najbardziej aktualne na górze)
      </h3>
      <Form form={form}>
        <table className="w-full text-left rounded-md">
          <thead className="border-b-2">
            <tr>
              <th className="px-2 py-3">Lp.</th>
              <th className="px-2 py-3" style={{ width: 100 }}>
                Zmiana %
              </th>
              <th className="px-2 py-3" style={{ width: 120 }}>
                Od (włącznie)
              </th>
              <th className="px-2 py-3" style={{ width: 120 }}>
                Do (nie włącznie)
              </th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {(data as PriceChange[]).map((item, i) => (
              <tr
                key={item.id}
                className={clsx("border-b", i % 2 === 0 && "bg-gray-100")}
              >
                <td className="px-2 py-3">{i + 1}</td>
                <td className="px-2 py-3" style={{ width: 100 }}>
                  {item.change}
                </td>
                <td className="px-2 py-3" style={{ width: 120 }}>
                  {dayjs(item.dateFrom).format("YYYY-MM-DD")}
                </td>
                <td className="px-2 py-3" style={{ width: 120 }}>
                  {dayjs(item.dateTo).format("YYYY-MM-DD")}
                </td>
                <td className="px-2 py-3">
                  <BsFillTrashFill
                    className="cursor-pointer"
                    onClick={() => deletePriceChange(item.id)}
                  />
                </td>
              </tr>
            ))}
            <tr
              className={clsx(
                "border-b",
                data.length % 2 === 0 && "bg-gray-100",
              )}
            >
              <td className="px-2 py-3"></td>
              <td className="px-2 py-3">
                <Form.Item
                  name="priceChange"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <Form.Item
                  name="dateFrom"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <Input type="date" style={{ width: 130 }} />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <Form.Item
                  name="dateTo"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <Input type="date" style={{ width: 130 }} />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <button
                  className="bg-green-800 rounded-md text-white border-white border-2 w-24 text-sm p-1"
                  onClick={addPriceChange}
                >
                  Dodaj
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Form>
    </div>
  );
};
