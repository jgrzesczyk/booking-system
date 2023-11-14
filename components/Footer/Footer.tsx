import Image from "next/image";
import { AiFillMail, AiFillPhone } from "react-icons/ai";
import Link from "next/link";
import clsx from "clsx";
import { FC } from "react";

const Footer: FC<{ isAdmin?: boolean }> = ({ isAdmin }) => {
  return (
    <footer
      className={clsx(
        "py-10 text-white bg-opacity-80",
        isAdmin ? "bg-blue-800" : "bg-green-800",
      )}
    >
      <div className="max-w-screen-lg mx-auto flex gap-3 flex-col md:flex-row px-5 xl:px-0">
        <div className="basis-1/2 flex flex-col items-center md:items-start">
          <Image
            className="bg-white p-2 rounded-md mb-3"
            src="https://res.cloudinary.com/dyzjn59cu/image/upload/f_auto,q_auto/v1/page-assets/php1lsoethwkygceuxwk"
            alt="Wczasy pod gruszą"
            width={120}
            height={50}
          />

          <div className="font-bold">{`Wczasy "Pod Gruszą"`}</div>
          <div>ul. Karolkowa 30</div>
          <div className="mb-3">01-207 Warszawa</div>
          <Link
            href="mailto:wczasy.pod.grusza@britenet.eu"
            className="flex gap-2 items-center"
          >
            <AiFillMail /> wczasy.pod.grusza@britenet.eu
          </Link>
          <Link href="tel:+48221110030" className="flex gap-2 items-center">
            <AiFillPhone /> +48 22 111 00 30
          </Link>
        </div>
        <div className="basis-1/2">
          <iframe
            className="rounded-md"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.6435407760514!2d20.9779247!3d52.2316937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc9d2419b109%3A0x242d2e55f3766695!2sKarolkowa%2030%2C%2001-207%20Warszawa!5e0!3m2!1spl!2spl!4v1689606961674!5m2!1spl!2spl"
            height="300"
            width="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
