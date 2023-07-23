import { Article, Profile } from "@/lib/models";
import { ObjectValues } from "@/lib/utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getArticlesInProfilePage,
  getProfile,
  toggleFollowProfileInProfilePage,
} from "./profile.action";

export const ARTICLE_TYPE = {
  MyArticle: "myArticle",
  FavoritedArticle: "favoritedArticle",
} as const;

export type ArticleType = ObjectValues<typeof ARTICLE_TYPE>;
export const LIMIT_ARTICLES_IN_PROFILE_PAGE = 5;

interface ProfileState {
  profile: Profile | null;
  articleList: Article[];
  articleCount: number;
  currentOffset: number;
  articleType: ArticleType;
}

const initialState: ProfileState = {
  profile: null,
  articleCount: 0,
  currentOffset: 0,
  articleList: [],
  articleType: ARTICLE_TYPE.MyArticle,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: () => initialState,
    updateCurrentOffset: (state, action: PayloadAction<number>) => {
      state.currentOffset = action.payload;
    },
    updateArticleType: (state, action: PayloadAction<ArticleType>) => {
      state.articleType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(
      toggleFollowProfileInProfilePage.fulfilled,
      (state, action) => {
        state.profile = action.payload.profile;
      },
    );
    builder.addCase(getArticlesInProfilePage.fulfilled, (state, action) => {
      state.articleCount = action.payload.articlesCount;
      state.articleList = action.payload.articles;
    });
  },
});
