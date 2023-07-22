import { DEFAULT_LIMIT } from "@/lib/constants";
import { AppDispatch, RootState } from "@/lib/store/app.store";
import { FEED_TYPE, FeedType, loadArticlesHomePage } from "@/lib/store/home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./feed-toggle.module.scss";

interface TabItem {
  title: string;
  feedType: FeedType;
}

export default function FeedToggle() {
  const { isAuthenticated } = useSelector<RootState, RootState["auth"]>(
    (s) => s.auth,
  );
  const { feedTypeSelected, tagSelected } = useSelector<
    RootState,
    RootState["home"]
  >((s) => s.home);
  const dispatch: AppDispatch = useDispatch();
  const [tabList, setTabList] = useState<TabItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setTabList([
        {
          title: "Global Feed",
          feedType: FEED_TYPE.globalFeed,
        },
      ]);
      return;
    }
    const authTabList: TabItem[] = [
      {
        title: "Your Feed",
        feedType: FEED_TYPE.yourFeed,
      },
      {
        title: "Global Feed",
        feedType: FEED_TYPE.globalFeed,
      },
    ];
    setTabList(
      feedTypeSelected &&
        feedTypeSelected !== FEED_TYPE.globalFeed &&
        feedTypeSelected !== FEED_TYPE.yourFeed
        ? [
            ...authTabList,
            {
              title: `#${tagSelected}`,
              feedType: FEED_TYPE.tagFeed,
            },
          ]
        : authTabList,
    );
  }, [isAuthenticated, feedTypeSelected, tagSelected]);

  const handleToggleFeed = (feedType: FeedType) => {
    if (feedType === feedTypeSelected) {
      return;
    }

    dispatch(
      loadArticlesHomePage({
        feedType,
        params: {
          limit: DEFAULT_LIMIT,
          offset: 0,
        },
      }),
    );
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleToggleFeed(FEED_TYPE.yourFeed);
    } else {
      handleToggleFeed(FEED_TYPE.globalFeed);
    }
  }, [isAuthenticated]);

  const tabElements = tabList.map((tab) => {
    return (
      <li key={tab.title} className={`nav-item ${style["tab-item"]}`}>
        <span
          onClick={() => handleToggleFeed(tab.feedType)}
          className={`nav-link ${style["tab-link"]} ${
            tab.feedType === feedTypeSelected ? style.active : ""
          }`}
        >
          {tab.title}
        </span>
      </li>
    );
  });

  return (
    <div className="toggle">
      <ul className="nav nav-pills outline-active">{tabElements}</ul>
    </div>
  );
}
