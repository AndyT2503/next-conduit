import { articleAPI, profileAPI } from "@/lib/api";
import { ArticleAPIResponse, Profile } from "@/lib/models";
import { RootState } from "@/lib/store/app.store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getArticleDetail = createAsyncThunk(
  "articleDetail/getArticleDetail",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.getArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteArticle = createAsyncThunk(
  "articleDetail/deleteArticle",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.deleteArticle(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleFollowProfileInArticleDetailPage = createAsyncThunk(
  "articleDetail/toggleFollowProfileInArticleDetailPage",
  async (profile: Profile, { rejectWithValue }) => {
    try {
      if (profile.following) {
        return await profileAPI.unFollowProfile(profile.username);
      } else {
        return await profileAPI.followProfile(profile.username);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const createComment = createAsyncThunk(
  "articleDetail/createComment",
  async (
    props: { slug: string; comment: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await articleAPI.createCommentForArticle(props.slug, {
        body: props.comment,
      });
      dispatch(getArticleComments(props.slug));
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getArticleComments = createAsyncThunk(
  "articleDetail/getArticleComments",
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await articleAPI.getArticleComments(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteArticleComment = createAsyncThunk(
  "articleDetail/deleteArticleComment",
  async (
    props: { slug: string; commentId: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await articleAPI.deleteArticleComment(
        props.slug,
        props.commentId,
      );
      dispatch(getArticleComments(props.slug));
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleFavoriteArticleInArticleDetailPage = createAsyncThunk<
  ArticleAPIResponse,
  string,
  {
    state: RootState;
  }
>(
  "articleDetail/toggleFavoriteArticleInArticleDetailPage",
  async (slug: string, { rejectWithValue, getState }) => {
    const article = getState().articleDetail.article;
    if (!article) {
      return rejectWithValue("Article does not exist");
    }
    try {
      if (article.favorited) {
        return await articleAPI.unFavoriteArticle(slug);
      } else {
        return await articleAPI.favoriteArticle(slug);
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
