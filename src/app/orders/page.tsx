import { Header } from "@ck/components/header";
import { cookies } from "next/headers";
import { env } from "process";
import { Fragment, Suspense } from "react";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { UserRouteResponse } from "../api/user/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import { listOrders } from "./listorders";
import { OrderInfo } from "@ck/components/orderInfo";
import './listorders.css'

export default async function OrdersList() {
  const ck = await cookies();

  let login: null | UserRouteResponse = null;
  if (ck.get("session")?.value) {
    login = await (
      await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, {
        headers: { Cookie: `session=${ck.get("session")?.value}` },
      })
    ).json();
  }

  const orders = login ? await listOrders(login) : []
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
            <Link className="back mb-4 font-semibold block text-right" href="/">
              Wróć na stronę główną
            </Link>


            {
              orders.length ? <>
                {orders.map((order, ix) => {
                  return <Fragment key={order._id}>

                    <h2 className="font-bold text-xl mt-4">Zamówienie #{ix + 1}</h2>
                    <OrderInfo readonly products={order.products}></OrderInfo>
                  </Fragment>
                })}
              </> : <><h2 className="font-bold text-lg">Brak historii zamówień</h2></>}
          </Suspense>
        ) : redirect("/")
        }
      </div>
    </div >
  );
}

