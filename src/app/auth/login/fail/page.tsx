import { LoginForm } from "../form";
import { loginAction } from "../action";

export default function FailedLoginPage() {
  return (
    <>
      <form action={loginAction}>
        <LoginForm />
        <h2 className="font-italic text-red-500 text-center mt-2">
          Authentication failure
        </h2>
      </form>
    </>
  );
}
