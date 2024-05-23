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

export type ReplyFormProps = {
  articleId: number;
}

export type API = {
  get: <T>(url: string) => Promise<{ data: T }>;
}

export type ThunkExtraArgument = {
  api: API;
}
