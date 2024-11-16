import { MongoClient, ObjectId } from 'mongodb'
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";


export interface UserRouteResponse {
  type: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
  session: {
    _id: string;
    user: string;
    created: number;
    expire: number;
  }
}

// there's like 10 CVEs sitting in this route. But it's useful.

export const GET = async (request: NextRequest) => {
  const uri = env.MONGODB_URI ? env.MONGODB_URI : (() => { throw Error("no mongodb URI, set MONGODB_URI environment variable") })()
  const client = new MongoClient(uri)
  await client.connect()
  const ck = await cookies()
  const sessionID = new ObjectId(ck.get("session")?.value)

  const db = client.db("cukiernia")
  const sessions = db.collection("sessions")
  const res = await sessions.aggregate([
    // taki sobie inner join w mongodb
    {
      '$match': {
        '_id': new ObjectId(sessionID)
      }
    }, {
      '$lookup': {
        'from': 'users',
        'localField': 'user',
        'foreignField': 'username',
        'as': 'userdoc',
        'pipeline': [{
          '$project': {
            'hash': 0 // RIP `wordbook`. Never forghetti.
          }
        }]
      }
    }, {
      '$limit': 1
    }
  ]).toArray()

  if (!res) {
    return NextResponse.json({ "status": "aggregation failed" }, { status: 404 })
  }

  await client.close()
  return NextResponse.json({ "type": "user from session cookie", user: res[0].userdoc[0], session: res[0] })
}
