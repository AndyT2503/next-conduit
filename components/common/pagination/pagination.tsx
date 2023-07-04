import { DEFAULT_LIMIT } from "@/lib/constants";
import { useEffect, useState } from "react";
import style from "./pagination.module.scss";

type PaginationProps = {
  totalCount: number;
  limit: number;
  offset: number;
  onOffsetChange: (offset: number) => void;
};

export default function Pagination({
  totalCount,
  limit = DEFAULT_LIMIT,
  offset,
  onOffsetChange,
}: PaginationProps) {
  const [totalPage, setTotalPage] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [hasPagination, setHasPagination] = useState(true);

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / limit));
    setHasPagination(totalCount > limit);
  }, [totalCount, limit]);

  useEffect(() => {
    setCurrentPageIndex(offset / limit + 1);
  }, [offset, limit]);

  if (!hasPagination) {
    return <></>;
  }

  const listPagination = [...Array(totalPage).keys()].map((index) => (
    <li
      key={index + 1}
      className={`${style["page-item"]} ${
        currentPageIndex === index + 1 ? style.active : ""
      }`}
      onClick={() => {
        onOffsetChange(index + limit);
      }}
    >
      <a className={style["page-link"]}>{index + 1}</a>
    </li>
  ));

  return <ul className={style.pagination}>{listPagination}</ul>;
}
