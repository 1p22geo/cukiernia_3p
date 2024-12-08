import { Header } from "@ck/components/header";
import { cookies } from "next/headers";
import { env } from "process";
import { Suspense } from "react";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { UserRouteResponse } from "../api/user/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderInfo } from "../../components/orderInfo";
import { listOrder } from "./listorder";
import { createOrderAction } from "./action";

export default async function ActiveOrderPage() {
  const ck = await cookies();

  let login: null | UserRouteResponse = null;
  if (ck.get("session")?.value) {
    login = await (
      await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, {
        headers: { Cookie: `session=${ck.get("session")?.value}` },
      })
    ).json();
  }

  const products = login ? await listOrder(login.user.activeorder) : []
  return (
    <div>
      <Header user={login?.user ? login.user.username : null} />

      <div className="w-screen p-4">
        {login ? (
          <Suspense
            fallback={
              <>
                <h2>
                  Poczekaj chwilę,{" "}
                  <span className="italic">{login.user.username}</span>
                </h2>
                <LoadingGIF />
              </>
            }
          >
            <Link className="mb-4 font-semibold block text-right" href="/">
              Wróć na stronę główną
            </Link>

            <Link className="mb-4 font-semibold block text-right" href="/orders">
              Historia zamówień
            </Link>

            {
              products.length ? <>

                <h2 className="font-bold text-xl">Twój koszyk</h2>
                <OrderInfo products={products} />
                <form action={createOrderAction(login, products)}>
                  <h2 className="mt-4 font-bold text-lg">Złóż zamówienie:</h2>
                  <input placeholder="Adres zamówienia?" name="address" className="p-1 border" />
                  <input placeholder="Port zamówienia?" name="port" className="p-1 border" />
                  <span className="block text-gray-400 text-sm">
                    tu powinny być inne dane ale to tylko prototyp i nie ma żadnych zamówień
                  </span>
                  <input id="order-submit" type="submit" className="sr-only" />
                  <label htmlFor="order-submit"><button className="bg-red-500 mt-auto hover:bg-red-600 p-1 rounded-md cursor-pointer mt-4">Wyślij zamówienie</button></label>
                </form>
              </> : <><h2 className="font-bold text-lg">Brak produktów w koszyku</h2></>}
          </Suspense>
        ) : redirect("/")
        }
      </div>
    </div >
  );
}
