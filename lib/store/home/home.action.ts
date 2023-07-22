import { ArticleGlobalQueryParams, articleAPI, tagAPI } from "@/lib/api";
import { Article, ArticlePagingAPIResponse } from "@/lib/models";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "../app.store";
import { FEED_TYPE, FeedType, homeSlice } from "./home.slice";

export const fetchArticles = createAsyncThunk<
  ArticlePagingAPIResponse,
  void,
  {
    state: RootState;
  }
>("home/fetchArticle", async (_, { rejectWithValue, getState }) => {
  try {
    const { feedTypeSelected, currentLimit, currentOffset, tagSelected } =
      getState().home;
    switch (feedTypeSelected) {
      case FEED_TYPE.tagFeed:
        return await articleAPI.getGlobalArticles({
          limit: currentLimit,
          offset: currentOffset,
          tag: tagSelected!,
        });
      case FEED_TYPE.globalFeed:
        return await articleAPI.getGlobalArticles({
          limit: currentLimit,
          offset: currentOffset,
        });
      default:
        return await articleAPI.getFeed({
          limit: currentLimit,
          offset: currentOffset,
        });
    }
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const changeOffset = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
  }
>("home/changeOffset", (offset, { dispatch }) => {
  dispatch(homeSlice.actions.changeOffset({ offset }));
  dispatch(fetchArticles());
});

export const loadArticlesHomePage = createAsyncThunk<
  void,
  {
    feedType: FeedType;
    params: ArticleGlobalQueryParams;
  },
  {
    dispatch: AppDispatch;
  }
>("home/loadArticlesHomePage", (props, { dispatch }) => {
  dispatch(homeSlice.actions.changeFilterParams(props));
  dispatch(fetchArticles());
});

export const toggleFavoriteArticleInHomePage = createAsyncThunk<
  void,
  Article,
  {
    dispatch: AppDispatch;
  }
>(
  "home/toggleFavoriteArticleInHomePage",
  async (article, { rejectWithValue, dispatch }) => {
    try {
      if (article.favorited) {
        await articleAPI.unFavoriteArticle(article.slug);
      } else {
        await articleAPI.favoriteArticle(article.slug);
      }
      dispatch(fetchArticles());
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getTags = createAsyncThunk(
  "home/getTags",
  async (_: void, { rejectWithValue }) => {
    try {
      const response = await tagAPI.getTags();
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
