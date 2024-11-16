import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { env } from "process"


export const signupAction = async (data: FormData) => {
  "use server"

  const mail = data.get("email")
  const user = data.get("username")
  const pass = data.get("password")

  const res = await fetch(`${env.SELF_URI ?? "http://localhost:3000"}/api/signup`, {
    method: "POST",
    body: JSON.stringify({
      username: user,
      password: pass,
      email: mail
    })
  })

  if (res.status == 409) {
    redirect("/auth/signup/exists")
  }

  if (res.status != 201) {
    redirect("/auth/signup/fail")
  }

  const loginRes = await fetch(`${env.SELF_URI ?? "http://localhost:3000"}/api/login`, {
    method: "POST",
    body: JSON.stringify({
      username: user,
      password: pass
    })
  })
  const loginData = await loginRes.json()

  const ck = await cookies()
  ck.set("session", loginData.id)


  redirect("/")

}
