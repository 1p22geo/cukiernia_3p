import { SignupForm } from "../form";
import { signupAction } from "../action";

export default function FailedLoginPage() {
  return <>
    <form action={signupAction} >
      <SignupForm />
      <h2 className="font-italic text-red-500 text-center mt-2">Invalid data</h2>
      <h2 className="font-italic text-red-400 text-center text-sm">Check password security or email typos</h2>
    </form>

  </>
}
