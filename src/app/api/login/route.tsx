import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from 'mongodb'
import { env } from "process";
import bcrypt from 'bcryptjs'

export interface LoginRoutePOSTData {
  username: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  const data = await req.json() as LoginRoutePOSTData
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()

  const db = client.db("cukiernia")
  const users = db.collection("users")
  const sessions = db.collection("sessions")

  const user = await users.findOne({
    $or: [
      {
        username: data.username
      },
      {
        email: data.username
      }
    ]
  })

  if (!user) {
    return NextResponse.json({ "status": "error", "error": "authentication failure" }, { status: 401 })
  }

  if (!bcrypt.compareSync(data.password, user.hash)) {
    return NextResponse.json({ "status": "error", "error": "authentication failure" }, { status: 401 })
  }

  const { insertedId } = await sessions.insertOne({
    user: data.username,
    created: Date.now(),
    expire: Date.now() + 24 * 60 * 60 * 1000
  })


  await client.close()
  return NextResponse.json({ "status": "session created", id: insertedId })
}
