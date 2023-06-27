import { AUTH_MENU, NON_AUTH_MENU } from "@/lib/constants";
import { RootState } from "@/lib/store/app.store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./header.module.scss";

export default function Header() {
  const [menu, setMenu] = useState(NON_AUTH_MENU);
  const router = useRouter();
  const { user } = useSelector<RootState, RootState["auth"]>((s) => s.auth);

  useEffect(() => {
    if (user) {
      setMenu([
        ...AUTH_MENU,
        {
          title: user.username,
          url: `/@${user.username}`,
          image: user.image,
        },
      ]);
    } else {
      setMenu(NON_AUTH_MENU);
    }
  }, [user]);
  const menuItems = menu.map((item) => (
    <Link
      key={item.url}
      href={item.url}
      className={router.pathname == `${item.url}` ? style.active : ""}
    >
      {item.icon && <i className={`${item.icon} me-1`}></i>}
      {item.image && (
        <Image
          className={style["user-avatar"]}
          src={item.image}
          alt={item.title}
          width="26"
          height="26"
        />
      )}
      {item.title}
    </Link>
  ));

  return (
    <header className={style.header}>
      <Link href="/" className={style.logo}>
        conduit
      </Link>
      <div className={style["nav-bar"]}>{menuItems}</div>
    </header>
  );
}
