import { AuthState } from "@/lib/auth/auth-slice";
import { AUTH_MENU, NON_AUTH_MENU } from "@/lib/constants";
import { RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./header.module.scss";

export default function Header() {
  const [menu, setMenu] = useState(NON_AUTH_MENU);
  const { isAuthenticated } = useSelector<RootState, AuthState>((s) => s.auth);
  useEffect(() => {
    if (isAuthenticated) {
      setMenu(AUTH_MENU);
    } else {
      setMenu(NON_AUTH_MENU);
    }
  }, [isAuthenticated]);
  const menuItems = menu.map((item) => (
    <Link key={item.url} href={item.url}>
      <i className={`${style[item.icon!]} me-1`}></i>
      {item.title}
    </Link>
  ));
  return (
    <header className={style.header}>
      <Link href="" className={style.logo}>
        conduit
      </Link>
      <div className={style["nav-bar"]}>{menuItems}</div>
    </header>
  );
}
