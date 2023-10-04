import React from "react";
import clsx from "clsx";

const PageTitle: React.FC<{ title: string; isAdmin?: boolean }> = ({
  title,
  isAdmin,
}) => {
  return (
    <header
      className={clsx(
        "py-2 md:py-4 text-white bg-opacity-80",
        isAdmin ? "bg-blue-800" : "bg-green-800",
      )}
    >
      <div className="mx-auto lg:max-w-screen-lg flex justify-center">
        <h2 className="font-bold md:text-2xl">{title}</h2>
      </div>
    </header>
  );
};

export default PageTitle;
