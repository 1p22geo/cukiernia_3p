import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "process"

export const loginAction = async (data: FormData) => {
  "use server"

  const user = data.get("username")
  const pass = data.get("password")

  const res = await fetch(`${env.SELF_URI ?? "http://localhost:3000"}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username: user,
      password: pass
    })
  })
  const json = await res.json()

  if (res.status != 201) {
    redirect("/auth/login/fail")
  }

  const ck = await cookies()
  ck.set("session", json.id)

  redirect("/")

}
