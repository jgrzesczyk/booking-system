import dayjs from "dayjs";
import { AiFillSave } from "react-icons/ai";
import { FC } from "react";
import { EditReservationProps } from "@/app/admin/reservations/types";
import { Input, Select } from "antd";

export const EditReservationRow: FC<EditReservationProps> = ({
  onSubmit,
  data,
  setData,
  roomsPreview,
  methodsData,
  index,
}) => {
  const setDataProperty = (key: keyof typeof data, value: unknown) => {
    setData((data) =>
      !data
        ? null
        : {
            ...data,
            [key]: value,
          },
    );
  };

  return (
    <>
      <td className="px-2 py-3">{index}</td>
      <td className="px-2 py-3">
        <Select
          value={data.roomId}
          onChange={(roomId) => setDataProperty("roomId", roomId)}
        >
          {roomsPreview.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </td>
      <td className="px-2 py-3">
        <Input
          type="date"
          value={dayjs(data.dateFrom).format("YYYY-MM-DD")}
          onChange={(e) =>
            setDataProperty("dateFrom", dayjs(e.target.value).toDate())
          }
        />
      </td>
      <td className="px-2 py-3">
        <Input
          type="date"
          value={dayjs(data.dateTo).format("YYYY-MM-DD")}
          onChange={(e) =>
            setDataProperty("dateTo", dayjs(e.target.value).toDate())
          }
        />
      </td>
      <td className="px-2 py-3">
        <Input
          type="number"
          value={data.peopleNo}
          onChange={(e) => setDataProperty("peopleNo", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          type="number"
          value={data.price}
          onChange={(e) => setDataProperty("price", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Select
          value={data.paymentMethodId}
          onChange={(roomId) => setDataProperty("paymentMethodId", roomId)}
        >
          {methodsData.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </td>
      <td className="px-2 py-3">
        <Input
          value={data.name}
          onChange={(e) => setDataProperty("name", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          value={data.phone}
          onChange={(e) => setDataProperty("phone", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          type="email"
          value={data.email}
          onChange={(e) => setDataProperty("email", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          value={data.address}
          onChange={(e) => setDataProperty("address", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          value={data.postalCode}
          onChange={(e) => setDataProperty("postalCode", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">
        <Input
          value={data.city}
          onChange={(e) => setDataProperty("city", e.target.value)}
        />
      </td>
      <td className="px-2 py-3">{data.isPaid ? "Tak" : "Nie"}</td>
      <td className="px-2 py-3">
        <div className="flex gap-2">
          <AiFillSave className="cursor-pointer" onClick={onSubmit} />
        </div>
      </td>
    </>
  );
};
