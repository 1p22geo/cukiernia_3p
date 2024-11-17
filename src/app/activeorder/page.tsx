import { Header } from "@ck/components/header";
import { cookies } from "next/headers";
import { env } from "process";
import { Suspense } from "react";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { UserRouteResponse } from "../api/user/route";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrderInfo } from "./orderinfo";
import { listOrder } from "./listorder";

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
            <OrderInfo products={await listOrder(login.user.activeorder)} />
          </Suspense>
        ) : redirect("/")
        }
      </div>
    </div>
  );
}
