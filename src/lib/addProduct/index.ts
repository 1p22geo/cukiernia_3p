import { MongoClient, ObjectId } from "mongodb";
import { env } from "process";


export const addProductToOrder = async (id: ObjectId, uid: ObjectId) => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const users = db.collection("users");

  await users.updateOne({
    _id: new ObjectId(uid)
  },
    {
      $addToSet: {
        activeorder: new ObjectId(id)
      }
    }
  )

  await client.close()
}

export const createAddProduct = (id: ObjectId | string, uid: ObjectId | string) => async () => { "use server"; addProductToOrder(new ObjectId(id), new ObjectId(uid)) }
