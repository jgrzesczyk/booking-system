import Image from "next/image";
import { Attraction, ReservationBar, RoomPreview } from "@/components";
import prisma from "@/lib/prisma";
import { Amenity, Photo, Room } from "@prisma/client";

export const revalidate = 1; //revalidates every one second -- requires page reload

async function getData() {
  const rooms = await prisma.room.findMany({
    where: {
      isActive: true,
    },
    include: {
      amenities: {
        select: { name: true, id: true },
      },
      photos: {
        select: { name: true, roomId: true },
      },
    },
  });

  return rooms;
}

async function Home() {
  const rooms: (Room & { amenities: Amenity[]; photos: Photo[] })[] =
    await getData();

  return (
    <main className="w-full">
      <div className="relative">
        <Image
          className="block md:hidden opacity-80"
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/jkzp1eb7weg9klit771s"
          alt="Main photo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100vw", height: "100%", objectFit: "cover" }}
        />
        <Image
          className="hidden md:block opacity-80"
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/jkzp1eb7weg9klit771s"
          alt="Main photo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
        <div className="absolute bottom-28 pl-3 text-lg md:bottom-60 md:pl-20 text-white font-bold tracking-wide md:text-4xl shadow-black drop-shadow-2xl">
          Urokliwe miejsce niedaleko Ciebie
        </div>
        <div className="absolute bottom-20 pl-3 text-base md:bottom-44 md:pl-20 text-white tracking-wide md:text-3xl drop-shadow-2xl">
          Przyjedź i wypocznij
        </div>
        <ReservationBar className="static md:absolute md:left-1/2 md:-translate-x-1/2 md:bottom-5" />
      </div>
      <section className="bg-gray-100 py-8 md:py-16">
        <h2 className="text-center uppercase font-bold text-2xl md:text-4xl mb-8 md:mb-16">
          Pokoje
        </h2>
        <div className="px-5 xl:px-0 grid-cols-1 md:grid-cols-2 grid gap-10 max-w-screen-lg mx-auto">
          {rooms.map((room) => (
            <RoomPreview key={room.id} room={room} />
          ))}
        </div>
      </section>
      <section className="py-8 md:py-16 relative">
        <Image
          className="opacity-30 absolute -z-10 top-0"
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/wdgeeukivizqfr7nmwpj"
          alt="Panorama Warszawy"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100vw",
            height: "100%",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        />
        <h2 className="text-center uppercase font-bold text-2xl md:text-4xl mb-8 md:mb-16">
          Atrakcje
        </h2>
        <div className="px-5 xl:px-0 grid-cols-1 md:grid-cols-2 grid gap-10 max-w-screen-lg mx-auto">
          <Attraction
            source="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/j02vrjfoh0bwxdngflon"
            header="Pałac Kultury i Nauki"
            content="Najwyższy budynek w Polsce i zarazem wizytówka Warszawy. Ta wzorowana na amerykańskich wieżowcach atrakcja turystyczna miała być darem Związku Radzieckiego dla Polski, a dziś jest siedzibą wielu instytucji oraz firm."
          />
          <Attraction
            source="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/oeh3pwojskmryubqobrx"
            header="Zamek Królewski"
            content="Dawna rezydencja królów Polski i siedziba Sejmu. Muzeum wnętrz, ośrodek edukacji oraz miejsce uroczystości państwowych i międzynarodowych."
          />
          <Attraction
            source="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/p5abf7k5qzxpoanym2nh"
            header="Stadion Narodowy"
            content="Największy stadion w Polsce. Wielofunkcyjny obiekt sportowy wybudowany
        na wałach ziemnych wyburzonego Stadionu Dziesięciolecia."
          />
          <Attraction
            source="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/yyu2951op7hlksykzmam"
            header="Łazienki Królewskie"
            content="Zespół pałacowo-ogrodowy w Warszawie założony w XVIII wieku przez Stanisława Augusta Poniatowskiego."
          />
        </div>
      </section>
    </main>
  );
}
export default Home;
