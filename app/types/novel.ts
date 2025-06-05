export type Novel = {
  id: string | number;
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

type nextChapter = {
  id: number;
  slug: string;
};

export type Chapter = {
  id: number;
  novelId: string | number | undefined;
  slug: string;
  title: string;
  volume: number;
  chapter: number;
  content: string;
  view: number;
  next: nextChapter;
  created_at: string;
  updated_at: string;
};
