import { AuthState } from "@/lib/auth/auth-slice";
import { AUTH_MENU, NON_AUTH_MENU } from "@/lib/constants";
import { RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useSelector } from "react-redux";
import style from "./header.module.scss";

export default function Header() {
  const { isAuthenticated } = useSelector<RootState, AuthState>((s) => s.auth);
  const menu = isAuthenticated ? AUTH_MENU : NON_AUTH_MENU;
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
