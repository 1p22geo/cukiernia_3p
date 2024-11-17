import { Header } from "@ck/components/header";
import { loadProduct } from "@ck/lib/loadProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "process";
import { Suspense } from "react";
import { ProductInfo } from "./product";
import { LoadingGIF } from "@ck/components/loadingGIF";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const ck = await cookies();

  let login = null;
  if (ck.get("session")?.value) {
    login = await (
      await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, {
        headers: { Cookie: `session=${ck.get("session")?.value}` },
      })
    ).json();
  }

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
