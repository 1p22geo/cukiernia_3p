"use client";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { useState } from "react";
import "./log.css";

export const LoginForm = () => {
  const [loading, setloading] = useState(false);

  return (
    <div className="box flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">ZALOGUJ SIĘ</h2>
      <label htmlFor="username">Username lub email</label>
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
