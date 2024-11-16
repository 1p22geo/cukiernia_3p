import { MongoClient } from 'mongodb'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export const GET = async (request: NextRequest) => {
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()
  const ck = await cookies()
  const sessionID = ck.get("session")

  const db = client.db("cukiernia")
  const sessions = db.collection("sessions")
  const users = db.collection("users")

  const session = await sessions.findOne({ _id: sessionID });
  if (!session) {
    return NextResponse.json({ "status": "session not found" }, { status: 404 })
  }
  const user = await users.findOne({ _id: session.user })
  if (!user) {
    return NextResponse.json({ "status": "user not found" }, { status: 404 })
  }
  await client.close()
  return NextResponse.json({ "type": "user from session cookie", user: user })
}
