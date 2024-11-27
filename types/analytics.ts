// src/types/analytics.ts

export interface Analytics {
  current: {
    followers: number;
    following: number;
    posts: number;
  };
  changes: {
    followers: string;
    following: string;
    posts: string;
  };
  history: Array<{
    date: string;
    followers: number;
    following: number;
    posts: number;
  }>;
}
