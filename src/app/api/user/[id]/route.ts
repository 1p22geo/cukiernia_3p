import { MongoClient, ObjectId } from 'mongodb'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export const GET = async (request: NextRequest, params: { id: string }) => {
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()

  const db = client.db("cukiernia")
  const users = db.collection("users")


  const user = await users.findOne({ _id: new ObjectId(params.id) })
  if (!user) {
    return NextResponse.json({ "status": "user not found" }, { status: 404 })
  }

  await client.close()
  return NextResponse.json({ "type": "user from supplied ID", user: user })
}
