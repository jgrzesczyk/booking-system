"use client";

import Carousel from "react-multi-carousel";
import { FC } from "react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";

const RoomGallery: FC<{ photos: Photo[] }> = ({ photos }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      responsive={responsive}
      ssr
      showDots={photos?.length > 1}
      infinite={photos?.length > 1}
    >
      {photos?.map(({ name }) => (
        <div key={name} className={"h-72 relative"}>
          <CldImage className="object-cover" fill src={name} alt={name} />
        </div>
      ))}
    </Carousel>
  );
};

export default RoomGallery;
