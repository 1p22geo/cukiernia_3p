import { SignupForm } from "../form";
import { signupAction } from "../action";

export default function ExistsLoginPage() {
  return (
    <>
      <form action={signupAction}>
        <SignupForm />
        <h2 className="font-italic text-red-500 text-center mt-2">
          User already exists with this username or email
        </h2>
        <h2 className="font-italic text-red-400 text-center text-sm">
          Try adding some digits at the end or stop building your botnet
        </h2>
      </form>
    </>
  );
}
