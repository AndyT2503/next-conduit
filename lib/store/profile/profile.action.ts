import { articleAPI, profileAPI } from "@/lib/api";
import { Article, ArticlePagingAPIResponse, Profile } from "@/lib/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./../app.store";
import { ARTICLE_TYPE, ArticleType, LIMIT_ARTICLES_IN_PROFILE_PAGE, profileSlice } from "./profile.slice";

type GetArticleInProfilePageActionProps = {
  offset: number;
  articleType: ArticleType;
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (username: string, { rejectWithValue }) => {
    try {
      const response = await profileAPI.getProfile(username);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleFollowProfileInProfilePage = createAsyncThunk(
  "profile/toggleFollowProfileInProfilePage",
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

export const getArticlesInProfilePage = createAsyncThunk<
  ArticlePagingAPIResponse,
  GetArticleInProfilePageActionProps,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "profile/getArticlesInProfilePage",
  async (props, { dispatch, rejectWithValue, getState }) => {
    dispatch(profileSlice.actions.updateCurrentOffset(props.offset));
    dispatch(profileSlice.actions.updateArticleType(props.articleType));
    const { profile } = getState().profile;
    const filterParams =
      props.articleType === ARTICLE_TYPE.MyArticle
        ? {
            author: profile!.username,
          }
        : {
            favorited: profile!.username,
          };
    try {
      const response = await articleAPI.getGlobalArticles({
        offset: props.offset,
        limit: LIMIT_ARTICLES_IN_PROFILE_PAGE,
        ...filterParams,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleFavoriteArticleInProfilePage = createAsyncThunk<
  void,
  Article,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  "profile/toggleFavoriteArticleInProfilePage",
  async (article, { rejectWithValue, dispatch, getState }) => {
    try {
      if (article.favorited) {
        await articleAPI.unFavoriteArticle(article.slug);
      } else {
        await articleAPI.favoriteArticle(article.slug);
      }
      const { currentOffset, articleType } = getState().profile;
      dispatch(
        getArticlesInProfilePage({
          offset: currentOffset,
          articleType,
        }),
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
