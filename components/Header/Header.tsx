import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <nav className="z-10 gap-4 p-2 left-1/2 -translate-x-1/2 top-0 absolute bg-white bg-opacity-40 rounded-b-lg">
      <Link href="/">
        <Image
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk"
          alt="Wczasy Pod Gruszą"
          className="hidden md:block"
          width={140}
          height={112}
        />
        <Image
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk"
          alt="Wczasy Pod Gruszą"
          className="md:hidden"
          width={90}
          height={72}
        />
      </Link>
    </nav>
  );
};

const SubpageHeader = () => {
  return (
    <nav className="absolute bg-white left-6 p-2 rounded-b-lg border-green-800 border-opacity-80 border-2 border-t-0">
      <Link href="/">
        <Image
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk"
          className="hidden md:block"
          alt="Wczasy Pod Gruszą"
          width={90}
          height={72}
        />
        <Image
          src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk"
          alt="Wczasy Pod Gruszą"
          className="md:hidden"
          width={40}
          height={32}
        />
      </Link>
    </nav>
  );
};

Header.Subpage = SubpageHeader;

export default Header;
