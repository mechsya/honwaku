export type Novel = {
  id: string;
  slug: string;
  title: string;
  author: string;
  status: string;
  cover_url: string;
  ranting: number;
  genre: string;
  sinopsis: string;
  isRecomended: boolean;
  view: number;
  chapter: Chapter[];
  marked: boolean;
  comment: Comment[];
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  user_id: number;
  novel_id: number;
  content: string;
  like: number;
};

export type Chapter = {
  id: number;
  novel_id: number;
  slug: string;
  title: string;
  volume: number;
  chapter: number;
  content: string;
  view: number;
  next: Chapter;
  created_at: string;
  updated_at: string;
};
