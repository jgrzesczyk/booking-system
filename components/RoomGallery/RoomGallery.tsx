"use client";

import Carousel from "react-multi-carousel";
import { FC } from "react";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import clsx from "clsx";

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
        <div key={name} className={clsx("h-48 relative")}>
          <CldImage
            fill
            src={name}
            alt={name}
            strictTransformations
            transformations={["photogallery"]}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default RoomGallery;
