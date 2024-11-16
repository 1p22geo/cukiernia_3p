import { SignupForm } from "./form";
import { signupAction } from "./action";

export default function LoginPage() {
  return <>
    <form action={signupAction} >
      <SignupForm />
    </form>
  </>
}
