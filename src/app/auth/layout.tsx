import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="w-screen h-screen grid place-content-center p-2 bg-red-100">
        <div className="bg-red-100 p-4 outline outline-red-300 rounded-xl">
          {children}
        </div>
      </div>
    </>
  );
}
