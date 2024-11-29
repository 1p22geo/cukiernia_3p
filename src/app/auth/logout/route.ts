import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { env } from "process";
export const GET = async () => {
  const res = NextResponse.redirect(env.APP_URI ?? "http://0.0.0.0:3000")
  const session = res.cookies.get("session")?.value
  res.cookies.set("session", "");
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db("cukiernia");
  const sessions = db.collection("sessions");

  await sessions.deleteOne({ _id: new ObjectId(session) })

  await client.close()
  return res;
}
