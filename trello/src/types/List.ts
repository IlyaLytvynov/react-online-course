export interface List {
  id: string;
  name: string;
  closed: boolean;
  idBoard: string;
  pos: number;
  subscribed: boolean;
  softLimit?: any;
}

export type ListCollection = Array<List>;
