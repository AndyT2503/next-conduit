import { DEFAULT_LIMIT } from "@/lib/constants";
import { Article } from "@/lib/models";
import { ObjectValues } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";

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
    reset: () => initialState,
  },
});
