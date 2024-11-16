"use client"
import { useState } from "react"

export const LoginForm = () => {
  const [loading, setloading] = useState(false)

  return <div className="flex flex-col items-center">
    <h2 className="text-lg font-bold mb-2">Log in to your account</h2>
    <label htmlFor="username">Username or email</label>
    <input id="username" name="username" />
    <label htmlFor="password">Password</label>
    <input id="password" name="password" type="password" />
    <label htmlFor="submit">
      <div className="p-2 px-4 bg-red-300 rounded-md mt-4 cursor-pointer" onClick={() => { setloading(x => !x) }}>Log in</div>
    </label>
    <img src="/static/loading.gif" hidden={!loading} width={100} />
    <input type="submit" hidden id="submit" />
  </div>
}
