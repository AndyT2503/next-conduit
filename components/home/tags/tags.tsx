import { AppDispatch, RootState } from "@/lib/store/app.store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./tags.module.scss";
import { DEFAULT_LIMIT } from "@/lib/constants";
import { FEED_TYPE, getTags, loadArticles } from "@/lib/store/home";
export default function Tags() {
  const { tags } = useSelector<RootState, RootState["home"]>((s) => s.home);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, []);

  const handleSelectTag = (tag: string) => {
    dispatch(
      loadArticles({
        feedType: FEED_TYPE.tagFeed,
        params: {
          limit: DEFAULT_LIMIT,
          offset: 0,
          tag,
        },
      }),
    );
  };

  const tagElements = tags.map((tag) => (
    <span
      key={tag}
      className={`${style["tag-default"]} ${style["trending-tag"]}`}
      onClick={() => handleSelectTag(tag)}
    >
      {tag}
    </span>
  ));

  return (
    <div className={style["side-bar"]}>
      <p>Popular Tags</p>
      <div>{tagElements}</div>
    </div>
  );
}
