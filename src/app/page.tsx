import { Header } from "@ck/components/header";
import { cookies } from "next/headers";
import { env } from "process";

export default async function Home() {
  const ck = await cookies();

  const login = await (await fetch(`${env.SELF_URI ?? "localhost:3000"}/api/user`, { headers: { Cookie: `session=${ck.get("session")?.value}` } })).json()
  return (<div>
    <Header user={null} />
  </div>
  );
}
