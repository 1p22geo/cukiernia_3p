import { UserRouteResponse } from "@ck/app/api/user/route";
import { delProduct } from "@ck/lib/delProduct";
import { MongoClient, ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";


export const POST = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const uri = env.MONGODB_URI
    ? env.MONGODB_URI
    : (() => {
      throw Error("no mongodb URI, set MONGODB_URI environment variable");
    })();
  const client = new MongoClient(uri);
  await client.connect();


  const sess_id = (await cookies()).get("session")?.value
  let login: null | UserRouteResponse = null;
  if (sess_id) {
    login = await (
      await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, {
        headers: { Cookie: `session=${sess_id}` },
      })
    ).json();
  }
  if (!login) {
    return NextResponse.json({
      "status": "error",
      "error": "no session cookie"
    }, { status: 401 })
  }

  const id = (await params).id

  await delProduct(new ObjectId(id), login.user._id)

  await client.close();
  return NextResponse.json({
    "status": "added"
  }, { "status": 201 });
};
