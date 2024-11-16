import { LoginForm } from "./form";
import { loginAction } from "./action";

export default function LoginPage() {
  return <>
    <form action={loginAction} >
      <LoginForm />
    </form>
  </>
}
