import { Header } from "@ck/components/header";
import { loadProduct } from "@ck/lib/loadProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "process";
import { Suspense } from "react";
import { ProductInfo } from "./product";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { addProductToOrder } from "./addProduct";
import { UserRouteResponse } from "@ck/app/api/user/route";
import { ObjectId } from "mongodb";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const ck = await cookies();

  let login: null | UserRouteResponse = null;
  if (ck.get("session")?.value) {
    login = await (
      await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, {
        headers: { Cookie: `session=${ck.get("session")?.value}` },
      })
    ).json();
  }

  const id = (await params).id
  if (!id) {
    redirect("/");
  }

  const product = await loadProduct(id);

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
            <ProductInfo product={product} />
            <form action={async () => {
              "use server"

              addProductToOrder(new ObjectId(id), login.user._id)
            }}>
              <input type="submit" id="submit" className="sr-only" />
              <label htmlFor="submit" className="bg-red-500 hover:bg-red-600 p-1 rounded-md cursor-pointer">Dodaj do koszyka</label>
            </form>

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
            <ProductInfo product={product} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
