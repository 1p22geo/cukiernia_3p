import { Product, ProductSanitized } from "@ck/utils/types/product";
import { UserRouteResponse } from "../api/user/route"
import { MongoClient, ObjectId } from "mongodb";
import { env } from "process";


interface OrderData {
  login: UserRouteResponse;
  adress: string;
  port: string;
  products: Product[]
}


const orderAction = async (data: OrderData) => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const users = db.collection("users");
  const orders = db.collection("orders");

  // async concurrent updates!

  const pr1 = users.findOneAndUpdate({
    _id: new ObjectId(data.login.user._id)
  }, {
    $set: {
      "activeorder": []
    }
  })

  const pr2 = orders.insertOne({
    user: data.login.user.username,
    ...data,
    login: undefined // delete the login field but copy the object otherwise
  })


  await Promise.all([pr1, pr2]);

  await client.close();

}

export const createOrderAction = (login: UserRouteResponse, products: Product[] | ProductSanitized[]) => async (d: FormData) => { "use server"; return await orderAction({ login, adress: d.get("address")?.toString() ?? "", port: d.get("port")?.toString() ?? "", products: products.map(product => ({ ...product, _id: new ObjectId(product._id) })) }) }
