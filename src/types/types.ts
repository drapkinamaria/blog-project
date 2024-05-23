export type Reply = {
  id: string;
  text: string;
};

export type NewsItem = {
  id: number;
  by: string;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
  replies: Reply[];
};

export type NewsState = {
  ids: number[];
  newsItems: NewsItem[];
  isLoading: boolean;
  error: string | null;
};
