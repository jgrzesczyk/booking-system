import clsx from "clsx";
import { BsFillTrashFill } from "react-icons/bs";
import { Checkbox, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { RxSwitch } from "react-icons/rx";
import { PaymentMethodsResponse } from "@/app/admin/utilities/types";
import { AiFillEdit, AiFillSave } from "react-icons/ai";

export const PaymentMethods = () => {
  const [data, setData] = useState<PaymentMethodsResponse>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [editName, setEditName] = useState<string>("");
  const [editDescription, setEditDescription] = useState<string>("");
  const [form] = useForm();

  const fetchData = async () => {
    const res = await fetch("/api/admin/payment-method", {
      method: "GET",
    });

    const data = await res.json();
    setData(data);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

  const addPaymentMethod = async () => {
    try {
      await form.validateFields();
      const res = await fetch("/api/admin/payment-method", {
        method: "POST",
        body: JSON.stringify(form.getFieldsValue()),
      });

      if (res?.ok) {
        await fetchData();
        form.resetFields();
        message.success("Dodano metodę płatności");
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

  const deletePaymentMethod = async (id: number) => {
    const res = await fetch(`/api/admin/payment-method/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Usunięto methodę płatności");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };
  const toggleActivePaymentMethod = async (id: number) => {
    const res = await fetch(`/api/admin/payment-method/${id}/active`, {
      method: "PUT",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Zmieniono aktywność metody płatności");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  const handleToggleEdit = (method: PaymentMethodsResponse[0]) => {
    setEditId(method.id);
    setEditName(method.name);
    setEditDescription(method.description);
  };

  const handleEditMethod = async () => {
    const data = {
      name: editName,
      description: editDescription,
    };

    const res = await fetch(`/api/admin/payment-method/${editId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (res?.ok) {
      await fetchData();
      message.success("Zmieniono metodę płatności");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }

    setEditId(null);
    setEditName("");
    setEditDescription("");
  };

  return (
    <div className="col-span-2">
      <h3 className="mb-6 text-lg">Metody płatności</h3>
      <Form form={form}>
        <table className="w-full text-left rounded-md">
          <thead className="border-b-2">
            <tr>
              <th className="px-2 py-3">Lp.</th>
              <th className="px-2 py-3">Nazwa</th>
              <th className="px-2 py-3">Opis</th>
              <th className="px-2 py-3">Czy aktywna</th>
              <th className="px-2 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={item.id}
                className={clsx("border-b", i % 2 === 0 && "bg-gray-100")}
              >
                <td className="px-2 py-3">{i + 1}</td>
                <td className="px-2 py-3">
                  {item.id === editId ? (
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td className="px-2 py-3">
                  {item.id === editId ? (
                    <TextArea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  ) : (
                    item.description
                  )}
                </td>
                <td className="px-2 py-3">{item.isActive ? "Tak" : "Nie"}</td>
                <td className="px-2 py-3">
                  <div className="flex gap-2">
                    {item.id === editId ? (
                      <AiFillSave
                        className="cursor-pointer"
                        onClick={handleEditMethod}
                      />
                    ) : (
                      <AiFillEdit
                        className="cursor-pointer"
                        onClick={() => handleToggleEdit(item)}
                      />
                    )}
                    <RxSwitch
                      className="cursor-pointer"
                      onClick={() => toggleActivePaymentMethod(item.id)}
                    />
                    {!item.isUsed && (
                      <BsFillTrashFill
                        className="cursor-pointer"
                        onClick={() => deletePaymentMethod(item.id)}
                      />
                    )}
                  </div>
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
                  name="name"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <Input />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: "" }]}
                  className="!mb-0"
                >
                  <TextArea />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <Form.Item
                  name="isActive"
                  valuePropName="checked"
                  className="!mb-0"
                >
                  <Checkbox />
                </Form.Item>
              </td>
              <td className="px-2 py-3">
                <button
                  className="bg-green-800 rounded-md text-white border-white border-2 w-24 text-sm p-1"
                  onClick={addPaymentMethod}
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
