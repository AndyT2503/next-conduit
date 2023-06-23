import { RegisterBodyRequest } from "@/lib/api";
import { registerUser } from "@/lib/auth/auth-action";
import { AuthState, authSlice } from "@/lib/auth/auth-slice";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormErrors from "../common/form-errors/form-errors";
import style from "./register-form.module.scss";

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<RegisterBodyRequest>();
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

    const onSubmit: SubmitHandler<RegisterBodyRequest> = (data) => {
        dispatch(registerUser(data));
    };

    return (
        <div className={style.register}>
            <h1>Sign up</h1>
            <Link onClick={() => dispatch(authSlice.actions.resetErrorResponse())} href="/login" className={style.login}>
                Have an account?
            </Link>
            <form className={style["register-form"]} onSubmit={handleSubmit(onSubmit)}>
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
                    disabled={status === "pending"}
                    type="submit"
                    className={`btn ${style["sign-up-btn"]} btn-lg`}
                >
                    Sign up
                </button>
            </form>
        </div>
    )
}