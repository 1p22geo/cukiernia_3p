import { MongoClient, ObjectId } from "mongodb";
import { redirect } from "next/navigation";
import { env } from "process";


export const delProduct = async (id: ObjectId, uid: ObjectId) => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const users = db.collection<{ activeorder: ObjectId[] }>("users");

  await users.updateOne({
    _id: new ObjectId(uid)
  },
    {
      $pull: {
        activeorder: new ObjectId(id)
      }
    }
  )

  await client.close()
}

export const createDelProduct = (id: ObjectId | string, uid: ObjectId | string) => async () => { "use server"; delProduct(new ObjectId(id), new ObjectId(uid)) }
