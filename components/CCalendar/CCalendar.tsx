"use client";

import { Calendar, CalendarProps, Row } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { FC, HTMLAttributes, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import type { CellRenderInfo } from "rc-picker/lib/interface";

import "dayjs/locale/pl";
import locale from "antd/es/date-picker/locale/pl_PL";

import styles from "./CCalendar.module.scss";

dayjs.locale("pl");

const CCalendar: FC<CalendarProps<Dayjs>> = ({ className, ...props }) => {
  const [calendarViewDate, setCalendarViewDate] = useState(
    dayjs().startOf("month"),
  );

  const [calendarStartDate] = useState(dayjs().startOf("month"));
  const [calendarEndDate] = useState(dayjs().add(1, "year").startOf("month"));

  const cellRender = (current: Dayjs, info: CellRenderInfo<Dayjs>) => {
    if (info.type !== "date") return null;

    const busyDays = [
      "2023-09-19",
      "2023-09-20",
      "2023-09-21",
      "2023-09-22",
      "2023-09-26",
    ].map((date) => dayjs(date));

    if (busyDays.find((day) => day.isSame(current))) {
      return (
        <div className="ant-picker-cell-container bg-red-300 rounded-md mx-1">
          {info.originNode}
        </div>
      );
    }

    return (
      <div
        className="ant-picker-cell-container rounded-md mx-1 cursor-pointer hover:bg-green-800 hover:bg-opacity-80 hover:text-white"
        onClick={() => console.log(current)}
      >
        {info.originNode}
      </div>
    );
  };

  return (
    <Calendar
      locale={locale}
      className={`${className} ${styles.antdCalendar}`}
      value={calendarViewDate}
      fullscreen={false}
      validRange={[
        dayjs().subtract(1, "day"),
        dayjs().add(1, "year").endOf("month"),
      ]}
      fullCellRender={cellRender}
      headerRender={(headerRender) => (
        <Row className="gap-2 pb-3 items-center justify-center select-none">
          <AiOutlineDoubleLeft
            className={`cursor-pointer ${
              !calendarViewDate.isAfter(calendarStartDate) ? "invisible" : ""
            }`}
            onClick={() =>
              setCalendarViewDate(
                calendarViewDate.add(-1, "month").startOf("month"),
              )
            }
          />
          <div className="uppercase font-bold text-center w-24">
            {{ ...headerRender }.value.format("MMM YYYY")}
          </div>
          <AiOutlineDoubleRight
            className={`cursor-pointer ${
              !calendarViewDate.isBefore(calendarEndDate) ? "invisible" : ""
            }`}
            onClick={() =>
              setCalendarViewDate(
                calendarViewDate.add(1, "month").startOf("month"),
              )
            }
          />
        </Row>
      )}
      {...props}
    />
  );
};

export const CCalendarLegend: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => (
  <div className={`flex gap-2 items-center ${className}`}>
    <div className="bg-red-300 rounded-md w-4 h-4"></div>
    <div>Pokój zajęty</div>
  </div>
);

export default CCalendar;
