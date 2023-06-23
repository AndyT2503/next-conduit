import { LoginBodyRequest } from "@/lib/api";
import { loginUser } from "@/lib/auth/auth-action";
import { authSlice, AuthState } from "@/lib/auth/auth-slice";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import style from "./login-form.module.scss";
import FormErrors from "@/components/common/form-errors/form-errors";

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginBodyRequest>();
  const router = useRouter();
  const { isAuthenticated, status, errorResponse } = useSelector<RootState, AuthState>(
    (s) => s.auth
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  const onSubmit: SubmitHandler<LoginBodyRequest> = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className={style.login}>
      <h1>Sign in</h1>
      <Link onClick={() => dispatch(authSlice.actions.resetErrorResponse())} href="/register" className={style.register}>
        Need an account?
      </Link>
      <form className={style["login-form"]} onSubmit={handleSubmit(onSubmit)}>
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
          disabled={status === "pending"}
          type="submit"
          className={`btn ${style["sign-in-btn"]} btn-lg`}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
