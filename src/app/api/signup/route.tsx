import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
import { env } from "process";
import bcrypt from 'bcryptjs'

export interface SignupRoutePOSTData {
  username: string;
  password: string;
  email: string;
}

export const POST = async (req: NextRequest) => {
  const data = await req.json() as SignupRoutePOSTData
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()

  if (data.password.length < 8) {
    return NextResponse.json({ "status": "error", "error": "password security" }, { status: 400 })
  }

  const salt = bcrypt.genSaltSync(14)
  const hash = bcrypt.hashSync(data.password, salt)

  const db = client.db("cukiernia")
  const users = db.collection("users")

  const { insertedId } = await users.insertOne({
    username: data.username,
    email: data.email,
    hash: hash
  })

  await client.close()
  return NextResponse.json({ "status": "user created", id: insertedId }, { status: 201 })
}
