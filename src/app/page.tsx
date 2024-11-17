import { Header } from "@ck/components/header";
import { cookies } from "next/headers";
import { env } from "process";
import { ProductFeed } from "./productFeed/feed";
import { LandingPage } from "./landingPage/landing";
import { Suspense } from "react";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { UserRouteResponse } from "./api/user/route";
import Link from "next/link";

export default async function Home() {
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
            <Link className="mb-4 font-semibold block text-right" href="/activeorder">
              Koszyk ({login.user.activeorder.length} produktów)
            </Link>
            <ProductFeed login={login} />
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <>
                <h2>Ładowanie...</h2>
                <LoadingGIF />
              </>
            }
          >
            <LandingPage />
          </Suspense>
        )}
      </div>
    </div>
  );
}
