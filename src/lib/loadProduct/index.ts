import { Product } from "@ck/utils/types/product";
import { MongoClient, ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { env } from "process";

export const loadProduct = async (id: string): Promise<Product> => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
        throw Error("no mongodb URI, set MONGODB_URI environment variable");
      })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const products = db.collection("products");

  const product = await products.findOne({ _id: new ObjectId(id) });

  await client.close();
  if (!product) {
    redirect("/");
  }
  return product as unknown as Product;
};
