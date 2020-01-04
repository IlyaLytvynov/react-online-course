export interface Trello {
  board: number;
  card: number;
}

export interface AttachmentsByType {
  trello: Trello;
}

export interface Badges {
  attachmentsByType: AttachmentsByType;
  location: boolean;
  votes: number;
  viewingMemberVoted: boolean;
  subscribed: boolean;
  fogbugz: string;
  checkItems: number;
  checkItemsChecked: number;
  comments: number;
  attachments: number;
  description: boolean;
  due?: any;
  dueComplete: boolean;
}

export interface Cover {
  idAttachment?: any;
  color?: any;
  idUploadedBackground?: any;
  size: string;
  brightness: string;
}

export interface Card {
  id: string;
  checkItemStates?: any;
  closed: boolean;
  dateLastActivity: Date;
  desc: string;
  descData?: any;
  dueReminder?: any;
  idBoard: string;
  idList: string;
  idMembersVoted: any[];
  idShort: number;
  idAttachmentCover?: any;
  idLabels: any[];
  manualCoverAttachment: boolean;
  name: string;
  pos: number;
  shortLink: string;
  isTemplate: boolean;
  badges: Badges;
  dueComplete: boolean;
  due?: any;
  idChecklists: any[];
  idMembers: any[];
  labels: any[];
  shortUrl: string;
  subscribed: boolean;
  url: string;
  cover: Cover;
}

export type CardsCollection = Array<Card>;
