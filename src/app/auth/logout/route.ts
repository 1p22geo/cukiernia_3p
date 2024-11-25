import { NextResponse } from "next/server";
import { env } from "process";
export const GET = async () => {
  const res = NextResponse.redirect(env.APP_URI ?? "http://0.0.0.0:3000")
  res.cookies.set("session", "");

  return res;
}
