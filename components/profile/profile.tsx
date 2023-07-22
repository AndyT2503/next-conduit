import { useDispatch, useSelector } from "react-redux";
import style from "./profile.module.scss";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useRouter } from "next/router";
import {
  getProfile,
  profileSlice,
  toggleFollowProfile,
} from "@/lib/store/profile";
import { useEffect, useState } from "react";

export default function Profile() {
  const { profile } = useSelector<RootState, RootState["profile"]>(
    (s) => s.profile,
  );
  const { currentUser: user, isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (s) => s.auth,
  );
  const router = useRouter();

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const username = (router.query.username as string).replace("@", "");
    dispatch(getProfile(username));
  }, []);

  useEffect(() => {

  }, [profile, user])

  useEffect(() => {
    return () => {
      dispatch(profileSlice.actions.reset());
    };
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const toggleFollow = () => {
    if (!isAuthenticated) {
      router.push("/register");
      return;
    }
    if (profile) {
      dispatch(toggleFollowProfile(profile));
    }
  };
}
