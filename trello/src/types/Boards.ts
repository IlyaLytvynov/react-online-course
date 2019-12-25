export interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

export type BoardsCollection = Array<Board>;
