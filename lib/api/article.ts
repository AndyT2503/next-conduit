import { Article, ArticleAPIResponse, PagingQueryParams } from "../models";
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
      }
    );
    return response.data;
  },
  deleteArticle: async (slug: string) => {
    const response = await axiosRequest.delete(`articles/${slug}`);
    return response.data;
  },
  getArticle: async (slug: string) => {
    const response = await axiosRequest.get<ArticleAPIResponse>(
      `articles/${slug}`
    );
    return response.data;
  },
  favoriteArticle: async (slug: string) => {
    const response = await axiosRequest.post<ArticleAPIResponse>(
      `articles/${slug}/favorite`
    );
    return response.data;
  },
  unFavoriteArticle: async (slug: string) => {
    const response = await axiosRequest.delete<ArticleAPIResponse>(
      `articles/${slug}/favorite`
    );
    return response.data;
  },
};
