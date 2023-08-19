import React from "react";

const PageTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="py-2 md:py-4 text-white bg-green-800 bg-opacity-80">
      <div className=" mx-auto lg:max-w-screen-lg flex justify-center">
        <h2 className="font-bold text-lg md:text-2xl">{title}</h2>
      </div>
    </header>
  );
};

export default PageTitle;
