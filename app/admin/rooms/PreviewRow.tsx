import clsx from "clsx";
import { FC } from "react";
import { PreviewRowProps } from "@/app/admin/rooms/types";
import { AiFillEdit } from "react-icons/ai";
import { RxSwitch } from "react-icons/rx";
import { BsFillTrashFill } from "react-icons/bs";
import { message } from "antd";
import { useRouter } from "next/navigation";

export const PreviewRow: FC<PreviewRowProps> = ({
  index,
  row: item,
  fetchData,
}) => {
  const { push } = useRouter();

  const deleteRoom = async (id: number) => {
    const res = await fetch(`/api/admin/rooms/${id}`, {
      method: "DELETE",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Usunięto pokój");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  const toggleRoomActive = async (id: number) => {
    const res = await fetch(`/api/admin/rooms/${id}/active`, {
      method: "PUT",
    });

    if (res?.ok) {
      await fetchData();
      message.success("Zmieniono aktywność pokoju");
    } else {
      message.error("Wystąpił błąd, spróbuj ponownie");
    }
  };

  return (
    <tr
      key={item.id}
      className={clsx("border-b", index % 2 === 0 && "bg-gray-100")}
    >
      <td className="px-2 py-3">{index + 1}</td>
      <td className="px-2 py-3">{item.name}</td>
      <td className="px-2 py-3">{item.area}</td>
      <td className="px-2 py-3">{item.peopleNo}</td>
      <td className="px-2 py-3">{item.bedsDescription}</td>
      <td className="px-2 py-3">{`${item.price} zł`}</td>
      <td className="px-2 py-3">{item.isActive ? "Tak" : "Nie"}</td>
      <td className="px-2 py-3">
        <div className="flex gap-2">
          <AiFillEdit
            className="cursor-pointer"
            onClick={() => push(`/admin/rooms/${item.id}`)}
          />
          <RxSwitch
            className="cursor-pointer"
            onClick={() => toggleRoomActive(item.id)}
          />
          {!item.isUsed && (
            <BsFillTrashFill
              className="cursor-pointer"
              onClick={() => deleteRoom(item.id)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};
