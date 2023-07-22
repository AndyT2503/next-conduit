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
import Image from "next/image";

export default function Profile() {
  const { profile } = useSelector<RootState, RootState["profile"]>(
    (s) => s.profile,
  );
  const { currentUser, isAuthenticated } = useSelector<
    RootState,
    RootState["auth"]
  >((s) => s.auth);
  const router = useRouter();

  const [isCurrentUser, setIsCurrentUser] = useState(false);

  useEffect(() => {
    const username = (router.query.username as string).replace("@", "");
    dispatch(getProfile(username));
  }, []);

  useEffect(() => {
    if (profile && currentUser) {
      setIsCurrentUser(currentUser.username === profile.username);
    }
  }, [profile, currentUser]);

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

  const navigateToSetting = () => {
    router.push("/settings");
  };

  if (!profile) {
    return <></>;
  }

  const profileBtnElement = !isCurrentUser ? (
    <button
      onClick={toggleFollow}
      className="btn btn-outline-secondary btn-sm ms-auto d-flex align-items-center"
    >
      <i className="fa-solid fa-plus me-1"></i>{" "}
      {profile.following ? "Unfollow" : "Follow"} {profile.username}
    </button>
  ) : (
    <button
      className="btn btn-outline-secondary btn-sm ms-auto d-flex align-items-center"
      onClick={navigateToSetting}
    >
      <i className="fa-solid fa-gear me-1"></i> Edit Profile Settings
    </button>
  );

  return (
    <>
      <div className={style.banner}>
        <div className={style.container}>
          <div className={style["user-info"]}>
            <Image
              alt="avatar"
              width={100}
              height={100}
              className={style.avatar}
              src={profile.image}
            />
            <h4 className={style.username}>{profile.username}</h4>
          </div>
          {profileBtnElement}
        </div>
      </div>
      <div className={style.content}>
        <div className="offset-md-1"></div>
      </div>
    </>
  );
}
