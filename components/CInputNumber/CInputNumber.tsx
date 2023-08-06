import { FC } from "react";
import { InputNumber, InputNumberProps } from "antd";

import styles from "./CInputNumber.module.scss";

const CInputNumber: FC<InputNumberProps> = ({ className = "", ...props }) => {
  return (
    <InputNumber
      className={`!bg-transparent !border-0 font-semibold !text-sm md:!text-xl caret-transparent cursor-pointer !shadow-none ${styles.antdInputNumber} ${className}`}
      size="small"
      {...props}
    />
  );
};

export default CInputNumber;
