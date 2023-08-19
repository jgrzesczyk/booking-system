"use client";

import { FC } from "react";
import { DatePicker, DatePickerProps } from "antd";

import "dayjs/locale/pl";
import locale from "antd/es/date-picker/locale/pl_PL";
dayjs.locale("pl");

import styles from "./CDatePicker.module.scss";
import dayjs from "dayjs";

const CDatePicker: FC<DatePickerProps> = ({
  className = "",
  allowClear = false,
  suffixIcon = null,
  placeholder = "",
  ...props
}) => {
  return (
    <DatePicker
      locale={locale}
      className={`!bg-transparent !border-0 !p-0 font-semibold md:!text-xl caret-transparent cursor-pointer !shadow-none ${styles.antdDatepicker} ${className}`}
      popupClassName={styles.antdDatepickerPopup}
      allowClear={allowClear}
      suffixIcon={suffixIcon}
      placeholder={placeholder}
      inputReadOnly
      disabledDate={(current) => {
        const customDate = dayjs().format("YYYY-MM-DD");
        return current && current < dayjs(customDate, "YYYY-MM-DD");
      }}
      {...props}
    />
  );
};

export default CDatePicker;
