"use client";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { useState } from "react";

export const SignupForm = () => {
  const [loading, setloading] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">
        ZAREJESTRUJ SIĘ
      </h2>
      <label htmlFor="email">Adres E-mail</label>
      <input id="email" name="email" />
      <label htmlFor="username">Username</label>
      <input id="username" name="username" />
      <label htmlFor="password">Hasło</label>
      <input id="password" name="password" type="password" />
      <label htmlFor="submit">
        <div
          className="p-2 px-4 bg-red-300 rounded-md mt-4 cursor-pointer"
          onClick={() => {
            setloading((x) => !x);
          }}
        >
          Dalej
        </div>
      </label>
      <LoadingGIF hidden={!loading} />
      <input type="submit" hidden id="submit" />
    </div>
  );
};
