import { LoginBodyRequest } from "@/lib/api";
import { loginUser } from "@/lib/store/auth/auth.action";
import { authSlice } from "@/lib/store/auth/auth.slice";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormErrors from "@/components/common/form-errors/form-errors";
import { FormStatus } from "@/lib/constants";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginBodyRequest>();
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

  const onSubmit: SubmitHandler<LoginBodyRequest> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="form-container">
      <h1>Sign in</h1>
      <Link href="/register">Need an account?</Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrors errorResponse={errorResponse}></FormErrors>
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
          className="btn submit-btn btn-lg"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
