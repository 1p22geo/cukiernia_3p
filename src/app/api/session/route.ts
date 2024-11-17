import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "process";

export const GET = async () => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
        throw Error("no mongodb URI, set MONGODB_URI environment variable");
      })();
  const client = new MongoClient(uri);
  await client.connect();
  const ck = await cookies();
  const sessionID = ck.get("session");

  const db = client.db("cukiernia");
  const sessions = db.collection("sessions");

  const session = await sessions.findOne({ _id: sessionID });
  if (!session) {
    return NextResponse.json({ status: "session not found" }, { status: 404 });
  }
  await client.close();
  return NextResponse.json({
    type: "session from session cookie",
    session: session,
  });
};
