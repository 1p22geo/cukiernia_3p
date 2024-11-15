import { Header } from "@ck/components/header";
import { cookies } from "next/headers";

export default async function Home() {
  const ck = await cookies(); // wyciągnąć stąd sesje
  return (<div>
    <Header user={null} />
  </div>
  );
}
