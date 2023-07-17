import { AppDispatch, RootState } from "@/lib/store/app.store";
import {
    deleteArticleComment,
    getArticleComments,
} from "@/lib/store/article-detail";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./comment-list.module.scss";

export default function CommentList() {
  const { comments } = useSelector<RootState, RootState["articleDetail"]>(
    (s) => s.articleDetail,
  );
  const { user } = useSelector<RootState, RootState["auth"]>((s) => s.auth);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleComments(router.query.slug as string));
  }, []);

  const commentElements = comments.map((comment) => {
    const deleteBtn =
      user?.username === comment.author.username ? (
        <>
          <a
            className={style["delete-btn"]}
            onClick={() =>
              dispatch(
                deleteArticleComment({
                  slug: router.query.slug as string,
                  commentId: comment.id,
                }),
              )
            }
          >
            <i className="fa-solid fa-trash"></i>
          </a>
        </>
      ) : (
        <></>
      );
    return (
      <div className={style["card-comment"]}>
        <div className="card-body">
          <p>{comment.body}</p>
        </div>
        <div className={style["card-footer"]}>
          <Image
            alt="avatar"
            width={30}
            height={30}
            src={comment.author.image}
            className={style.avatar}
          />
          <a className={style.author} href={"/@" + comment.author.username}>
            {comment.author.username}
          </a>
          <p className={style.date}>
            {formatDateTime(
              comment.createdAt,
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              },
              "en-US",
            )}
          </p>
          {deleteBtn}
        </div>
      </div>
    );
  });
  return <div className={style["comment-list"]}>{commentElements}</div>;
}
