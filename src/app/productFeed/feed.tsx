import { UserRouteResponse } from "@ck/app/api/user/route";
import { ProductCard } from "@ck/components/productCard";
import { Product } from "@ck/utils/types/product";
import { MongoClient, ObjectId } from 'mongodb'
import { env } from "process";


export const ProductFeed = async ({ login }: { login: UserRouteResponse }) => {
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()

  // tu powinno być ai do dobierania produktów dla użytkownika
  const db = client.db("cukiernia")
  const collection = db.collection("products")
  // ale nie ma

  const list = await collection.aggregate([
    {
      $sample: {
        size: 3
      }
    }
  ]).toArray() as Product[] // trust me bro, the database entries follow the schema


  await client.close()

  return <div className="flex flex-col items-center gap-8 w-full">
    <div className="w-full">
      <h2>Wybór dla ciebie, <span className="italic">{login.user.username}</span></h2>
      <div className="flex flex-row items-center gap-4">
        {
          list.map(produkt =>
            <div key={produkt._id}><ProductCard>{produkt}</ProductCard></div>
          )
        }
      </div>
    </div>
  </div>
}
