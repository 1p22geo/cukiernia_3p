import { UserRouteResponse } from "@ck/app/api/user/route";
import { ProductCard } from "@ck/components/productCard";
import { Product, ProductSanitized } from "@ck/utils/types/product";
import { MongoClient } from "mongodb";
import { env } from "process";

export const ProductFeed = async ({ login }: { login: UserRouteResponse }) => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  // tu powinno być ai do dobierania produktów dla użytkownika
  const db = client.db("cukiernia");
  const collection = db.collection<ProductSanitized>("products");
  // ale nie ma

  const list: ProductSanitized[] = (await collection
    .aggregate([
      {
        $sample: {
          size: 3,
        },
      },
    ])
    .toArray() as Product[]).map((prod) => ({
      ...prod,
      _id: prod._id.toString()
    }))

  await client.close();

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="w-full">
        <h2>
          Wybór dla ciebie,{" "}
          <span className="italic">{login.user.username}</span>
        </h2>
        <div className="flex flex-row items-center gap-4">
          {list.map((produkt) => (
            <div key={produkt._id}>
              <ProductCard button={{ text: "Dodaj do koszyka", url: `/api/order/${produkt._id}/add`, init: { method: "POST" } }}>{produkt}</ProductCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
