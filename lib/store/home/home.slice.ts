import { ArticleGlobalQueryParams } from "@/lib/api";
import { DEFAULT_LIMIT } from "@/lib/constants";
import { Article } from "@/lib/models";
import { ObjectValues } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchArticles, getTags } from "./home.action";

export const FEED_TYPE = {
  yourFeed: "Your Feed",
  globalFeed: "Global Feed",
  tagFeed: "Tag Feed",
} as const;
export type FeedType = ObjectValues<typeof FEED_TYPE>;

interface HomeState {
  tags: string[];
  articleList: Article[];
  articleCount: number;
  feedTypeSelected: string | null;
  tagSelected: string | null;
  currentOffset: number;
  currentLimit: number;
}

const initialState: HomeState = {
  articleList: [],
  tags: [],
  articleCount: 0,
  feedTypeSelected: null,
  tagSelected: null,
  currentOffset: 0,
  currentLimit: DEFAULT_LIMIT,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    changeFilterParams: (
      state,
      action: PayloadAction<{
        feedType: FeedType;
        params: ArticleGlobalQueryParams;
      }>,
    ) => {
      state.currentOffset = action.payload.params.offset;
      state.feedTypeSelected = action.payload.feedType;
      state.tagSelected =
        action.payload.feedType === FEED_TYPE.tagFeed
          ? action.payload.params.tag!
          : null;
      state.currentLimit = action.payload.params.limit;
    },
    changeOffset: (state, action: PayloadAction<{ offset: number }>) => {
      state.currentOffset = action.payload.offset;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articleList = action.payload.articles;
      state.articleCount = action.payload.articlesCount;
    });
    builder.addCase(getTags.fulfilled, (state, action) => {
      state.tags = action.payload.tags;
    });
  },
});
