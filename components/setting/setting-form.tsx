import { UpdateCurrentUserBodyRequest } from "@/lib/api";
import { authSlice, updateCurrentUser } from "@/lib/store/auth";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormErrors from "../common/form-errors/form-errors";
import { FormStatus } from "@/lib/constants";

export default function SettingForm() {
  const { register, handleSubmit, setValue } =
    useForm<UpdateCurrentUserBodyRequest>();
  const router = useRouter();
  const { isAuthenticated, status, errorResponse, currentUser: user } = useSelector<
    RootState,
    RootState["auth"]
  >((s) => s.auth);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setValue("bio", user.bio);
      setValue("email", user.email);
      setValue("image", user.image);
      setValue("username", user.username);
    }
  }, [user]);

  useEffect(() => {
    return () => {
      dispatch(authSlice.actions.resetErrorResponse());
    };
  }, []);

  const onSubmit: SubmitHandler<UpdateCurrentUserBodyRequest> = (data) => {
    dispatch(updateCurrentUser(data));
  };

  return (
    <div className="form-container">
      <h1>Your Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormErrors errorResponse={errorResponse}></FormErrors>
        <input
          type="text"
          {...register("image")}
          className="form-control form-control-lg"
          autoComplete="new-image"
          placeholder="URL of profile picture"
        />
        <input
          type="text"
          {...register("username")}
          className="form-control form-control-lg"
          autoComplete="new-username"
          placeholder="Username"
        />
        <textarea
          {...register("bio")}
          rows={6}
          className="form-control form-control-lg"
          autoComplete="new-bio"
          placeholder="Short bio about you"
        ></textarea>
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
          Update Settings
        </button>
        <hr />
        <button
          type="button"
          className="btn me-auto btn-outline-danger"
          onClick={() => dispatch(authSlice.actions.logout())}
        >
          Or click here to logout
        </button>
      </form>
    </div>
  );
}
