import { FC, HTMLAttributes } from "react";
import Image from "next/image";

const Attraction: FC<
  HTMLAttributes<HTMLDivElement> & { source: string; header: string }
> = ({ header, source, className, content, ...props }) => {
  return (
    <div
      className={`basis-1/2 border-green-800 border-2 py-5 px-5 rounded-lg bg-white bg-opacity-80 flex flex-col gap-4 ${className}`}
      {...props}
    >
      <Image
        className="opacity-80 rounded-lg"
        src={source}
        alt={header}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100vw", height: "200px", objectFit: "cover" }}
      />
      <h3 className="font-bold text-xl text-center">{header}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Attraction;
