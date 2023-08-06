import Image from "next/image";

const Header = () => {
  return (
    <nav className="z-10 flex flex-col gap-4 p-2 left-1/2 -translate-x-1/2 top-0 absolute bg-white bg-opacity-40 rounded-b-lg">
      <Image
        src="/logo.png"
        alt="Wczasy Pod Gruszą"
        className="hidden md:block"
        width={140}
        height={112}
      />
      <Image
        src="/logo.png"
        alt="Wczasy Pod Gruszą"
        className="md:hidden"
        width={90}
        height={72}
      />
    </nav>
  );
};

export default Header;
