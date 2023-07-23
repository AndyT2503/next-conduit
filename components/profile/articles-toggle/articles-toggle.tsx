import { Menu } from "@/lib/constants";
import { RootState } from "@/lib/store/app.store";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./articles-toggle.module.scss";

export default function ArticlesToggle() {
  const { profile } = useSelector<RootState, RootState["profile"]>(
    (s) => s.profile,
  );
  const [tabList, setTabList] = useState<Menu[]>();
  const router = useRouter();
  useEffect(() => {
    if (profile) {
      setTabList([
        {
          url: `/@${profile.username}`,
          title: "My Articles",
        },
        {
          url: `/@${profile.username}/favorites`,
          title: "Favorited Articles",
        },
      ]);
    }
  }, [profile]);

  const tabListElement = tabList?.map((tab) => {
    return (
      <li key={tab.title} className={`nav-item ${style["tab-item"]}`}>
        <Link
          href={tab.url}
          className={`nav-link ${style["tab-link"]} ${
            decodeURIComponent(router.asPath) == `${tab.url}` ? style.active : ""
          }`}
        >
          {tab.title}
        </Link>
      </li>
    );
  });

  return <ul className="nav nav-pills outline-active">{tabListElement}</ul>;
}
