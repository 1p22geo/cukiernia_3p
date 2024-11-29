import { Header } from "@ck/components/header";
import { loadProduct } from "@ck/lib/loadProduct";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "process";
import { Suspense } from "react";
import { ProductInfo } from "./product";
import { LoadingGIF } from "@ck/components/loadingGIF";
import { createAddProduct } from "@ck/lib/addProduct";
import { UserRouteResponse } from "@ck/app/api/user/route";
import { addComment, createAddComment } from "./addComment";

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
            <form action={createAddProduct(id, login.user._id)}>
              <input type="submit" id="submit" className="sr-only" />
              <label htmlFor="submit" className="bg-red-500 hover:bg-red-600 p-1 rounded-md cursor-pointer">Dodaj do koszyka</label>
            </form>

            <h2 className="mt-4 font-bold text-lg"> Comments</h2>

            <form action={createAddComment(login.user._id, id)}>
              <textarea name="contents" className="border border-black" rows={10} cols={100} />
              <input type="submit" id="submit.2" className="sr-only" />
              <br />
              <label htmlFor="submit.2" className="bg-red-500 hover:bg-red-600 p-1 rounded-md cursor-pointer">Post comment</label>
            </form>

            {
              product.comments.map(c => <>
                <div className="p-4 flex flex-col items-start shadow-xl rounded-md w-fit m-4" key={c.posted}>
                  <h3 className="font-semibold">{c.poster.toString()}</h3>
                  <h3 className="text-gray-500">{new Date(c.posted).toISOString()}</h3>
                  {c.contents}
                </div>
              </>)
            }

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
