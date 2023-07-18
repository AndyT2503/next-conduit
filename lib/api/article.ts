import {
  Article,
  ArticleAPIResponse,
  PagingQueryParams,
  Comment,
  CommentAPIResponse,
  CommentListAPIResponse,
  ArticlePagingAPIResponse,
} from "../models";
import axiosRequest from "./axios-request";
export type UpsertArticleBodyRequest = Pick<
  Article,
  "title" | "description" | "body" | "tagList"
>;

export type ArticleGlobalQueryParams = PagingQueryParams & {
  tag?: string;
  author?: string;
  favorited?: string;
};

export type InsertCommentBodyRequest = Pick<Comment, "body">;

export const articleAPI = {
  createArticle: async (article: UpsertArticleBodyRequest) => {
    const response = await axiosRequest.post<ArticleAPIResponse>("articles", {
      article,
    });
    return response.data;
  },
  updateArticle: async (slug: string, article: UpsertArticleBodyRequest) => {
    const response = await axiosRequest.put<ArticleAPIResponse>(
      `articles/${slug}`,
      {
        article,
      },
    );
    return response.data;
  },
  deleteArticle: async (slug: string) => {
    const response = await axiosRequest.delete(`articles/${slug}`);
    return response.data;
  },
  getArticle: async (slug: string) => {
    const response = await axiosRequest.get<ArticleAPIResponse>(
      `articles/${slug}`,
    );
    return response.data;
  },
  favoriteArticle: async (slug: string) => {
    const response = await axiosRequest.post<ArticleAPIResponse>(
      `articles/${slug}/favorite`,
    );
    return response.data;
  },
  unFavoriteArticle: async (slug: string) => {
    const response = await axiosRequest.delete<ArticleAPIResponse>(
      `articles/${slug}/favorite`,
    );
    return response.data;
  },
  createCommentForArticle: async (
    slug: string,
    comment: InsertCommentBodyRequest,
  ) => {
    const response = await axiosRequest.post<CommentAPIResponse>(
      `articles/${slug}/comments`,
      {
        comment,
      },
    );
    return response.data;
  },
  getArticleComments: async (slug: string) => {
    const response = await axiosRequest.get<CommentListAPIResponse>(
      `articles/${slug}/comments`,
    );
    return response.data;
  },
  deleteArticleComment: async (slug: string, commentId: string) => {
    const response = await axiosRequest.delete(
      `articles/${slug}/comments/${commentId}`,
    );
    return response.data;
  },
  getGlobalArticles: async (queryParams: ArticleGlobalQueryParams) => {
    const response = await axiosRequest.get<ArticlePagingAPIResponse>(
      "/articles",
      {
        params: {
          ...queryParams,
        },
      },
    );
    return response.data;
  },
  getFeed: async (queryParams: PagingQueryParams) => {
    const response = await axiosRequest.get<ArticlePagingAPIResponse>(
      "/articles/feed",
      {
        params: {
          ...queryParams,
        },
      },
    );
    return response.data;
  },
};
