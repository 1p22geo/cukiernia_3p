import { MongoClient } from "mongodb";
import { env } from "process";
import { UserRouteResponse } from "../api/user/route";
import { Order, OrderSanitized } from "@ck/utils/types/order";

export const listOrders = async (login: UserRouteResponse): Promise<OrderSanitized[]> => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const orders = db.collection("orders");


  const res = (await orders.aggregate<Order>([
    {
      $match:
      {
        user: login.user.username,
      }
    }
  ]).toArray()).map((order) => ({
    ...order,
    _id: order._id.toString(),
    products: order.products.map(product => ({
      ...product,
      _id: product._id.toString()
    }))
  }))

  await client.close()

  return res as unknown as OrderSanitized[]
}
