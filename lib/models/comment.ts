import { Profile } from "./profile";

export interface CommentAPIResponse {
  comment: Comment;
}

export interface CommentListAPIResponse {
  comments: Comment[];
}

export interface Comment {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
