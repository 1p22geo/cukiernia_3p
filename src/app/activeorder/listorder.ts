import { Product, ProductSanitized } from "@ck/utils/types/product";
import { MongoClient, ObjectId } from "mongodb";
import { env } from "process";

export const listOrder = async (ids: ObjectId[]): Promise<ProductSanitized[]> => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const products = db.collection("products");


  const res = (await products.aggregate([
    {
      $match:
      {
        _id: {
          $in: [
            ...ids.map(id => new ObjectId(id))
          ]
        }
      }
    }
  ]).toArray()).map((prod) => ({
    ...prod,
    _id: prod._id.toString()
  }))

  await client.close()

  return res as unknown as ProductSanitized[]
}
