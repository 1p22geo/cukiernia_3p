import { User } from "@ck/utils/types/auth";
import { Product } from "@ck/utils/types/product";
import { MongoClient, ObjectId, WithoutId } from "mongodb";
import { env } from "process";


export const addRating = async (uid: ObjectId, cid: ObjectId, content: number) => {
  "use server"
  console.log(uid, cid, content)
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const users = db.collection<User>("users");
  const u = await users.findOne({ _id: uid });
  if (!u) {
    throw Error("wrong uid")
  }
  const products = db.collection<WithoutId<Product>>("products");

  await products.updateOne({
    _id: cid
  }, {
    $addToSet: {
      ratings: content
    }
  })

  await client.close();
}

export const createAddRating = (uid: ObjectId | string, cid: ObjectId | string, num: number) => async () => { "use server"; addRating(new ObjectId(uid), new ObjectId(cid), num) }
