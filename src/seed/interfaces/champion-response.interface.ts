export interface ChampResponse {
  data: {
    [key: string]: Champion;
  };
}

export interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
}
