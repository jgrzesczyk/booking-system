"use client";

import Carousel from "react-multi-carousel";
import Image from "next/image";

const RoomGallery = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel responsive={responsive} ssr showDots={true} infinite>
      {[...Array(3)].map((_, i) => (
        <Image
          key={i}
          src="/apartment-inside.jpg"
          alt="Pokój"
          height={1050}
          width={1680}
        />
      ))}
    </Carousel>
  );
};

export default RoomGallery;
