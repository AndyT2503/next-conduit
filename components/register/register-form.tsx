import { RegisterBodyRequest } from "@/lib/api";
import { registerUser } from "@/lib/auth/auth.action";
import { authSlice } from "@/lib/auth/auth.slice";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormErrors from "../common/form-errors/form-errors";
import { FormStatus } from "@/lib/constants";

export default function RegisterForm() {
  const { register, handleSubmit } = useForm<RegisterBodyRequest>();
  const router = useRouter();
  const { isAuthenticated, status, errorResponse } = useSelector<
    RootState,
    RootState['auth']
  >((s) => s.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    return () => {
      dispatch(authSlice.actions.resetErrorResponse());
    };
  }, []);

  const onSubmit: SubmitHandler<RegisterBodyRequest> = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="form-container">
      <h1>Sign up</h1>
      <Link href="/login">Have an account?</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrors errorResponse={errorResponse}></FormErrors>
        <input
          type="text"
          {...register("username")}
          className="form-control form-control-lg"
          autoComplete="new-username"
          placeholder="Username"
        />
        <input
          type="email"
          {...register("email")}
          className="form-control form-control-lg"
          autoComplete="new-email"
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password")}
          className="form-control form-control-lg"
          autoComplete="new-password"
          placeholder="Password"
        />
        <button
          disabled={status === FormStatus.Pending}
          type="submit"
          className={`btn submit-btn btn-lg`}
        >
          Sign up
        </button>
      </form>
    </div>
  );
}
