"use client";

import Link from "next/link";
import './header.css';

export const Header = (props: { user: string | null }) => {
  return (
    <div className="headr w-screen h-10 sticky top-0 bg-red-400 flex flex-row items-center px-2 gap-2">
      <Link href="/" className="title font-xl mr-auto">
        CUKIERNIA GLOGNUT
      </Link>
      {props.user ? (
        <>
          <div className="text-red-900">
            Zalogowano jako{" "}
            <span className="text-black font-bold">{props.user}</span>
          </div>
          <Link
            href="/auth/logout"
            className="bg-red-500 hover:bg-red-600 p-1 rounded-md"
          >
            Wyloguj się
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/auth/login"
            className="but bg-red-500 hover:bg-red-600 p-1"
          >
            Zaloguj się
          </Link>
          <Link
            href="/auth/signup"
            className="but bg-red-500 hover:bg-red-600 p-1"
          >
            Zarejestruj się
          </Link>
        </>
      )}
    </div>
  );
};
