import Image from "next/image";
import { Attraction, ReservationBar, RoomPreview } from "@/components";
import { ReactElement } from "react";

function Home() {
  return (
    <main className="w-full">
      <div className="relative">
        <Image
          className="block md:hidden opacity-80"
          src="/apartment-main.jpg"
          alt="Main photo"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100vw", height: "100%", objectFit: "cover" }}
        />
        <Image
          className="hidden md:block opacity-80"
          src="/apartment-main.jpg"
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
        <ReservationBar />
      </div>
      <section className="bg-gray-100 py-8 md:py-16">
        <h2 className="text-center uppercase font-bold text-2xl md:text-4xl mb-8 md:mb-16">
          Pokoje
        </h2>
        <div className="px-5 xl:px-0 grid-cols-1 md:grid-cols-2 grid gap-10 max-w-screen-lg mx-auto">
          <RoomPreview />
          <RoomPreview />
        </div>
      </section>
      <section className="py-8 md:py-16 relative">
        <Image
          className="opacity-30 absolute -z-10 top-0"
          src="/warsaw.jpg"
          alt="Panorama Warszawy"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100vw", height: "100%", objectFit: "cover" }}
        />
        <h2 className="text-center uppercase font-bold text-2xl md:text-4xl mb-8 md:mb-16">
          Atrakcje
        </h2>
        <div className="px-5 xl:px-0 grid-cols-1 md:grid-cols-2 grid gap-10 max-w-screen-lg mx-auto">
          <Attraction
            source="/culture-palace.jpg"
            header="Pałac Kultury i Nauki"
            content="Najwyższy budynek w Polsce i zarazem wizytówka Warszawy. Ta wzorowana na amerykańskich wieżowcach atrakcja turystyczna miała być darem Związku Radzieckiego dla Polski, a dziś jest siedzibą wielu instytucji oraz firm."
          />
          <Attraction
            source="/king-castle.jpg"
            header="Zamek Królewski"
            content="Dawna rezydencja królów Polski i siedziba Sejmu. Muzeum wnętrz, ośrodek edukacji oraz miejsce uroczystości państwowych i międzynarodowych."
          />
          <Attraction
            source="/national-stadium.jpg"
            header="Stadion Narodowy"
            content="Największy stadion w Polsce. Wielofunkcyjny obiekt sportowy wybudowany
        na wałach ziemnych wyburzonego Stadionu Dziesięciolecia."
          />
          <Attraction
            source="/lazienki-park.jpg"
            header="Łazienki Królewskie"
            content="Zespół pałacowo-ogrodowy w Warszawie założony w XVIII wieku przez Stanisława Augusta Poniatowskiego."
          />
        </div>
      </section>
    </main>
  );
}

Home.getLayout = (page: ReactElement) => {
  return <div>{page}</div>;
};
export default Home;
