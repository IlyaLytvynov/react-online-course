export interface PerBoard {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Attachments {
  perBoard: PerBoard;
}

export interface TotalMembersPerBoard {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Boards {
  totalMembersPerBoard: TotalMembersPerBoard;
}

export interface OpenPerBoard {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface TotalPerBoard {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Cards {
  openPerBoard: OpenPerBoard;
  totalPerBoard: TotalPerBoard;
}

export interface PerBoard2 {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Checklists {
  perBoard: PerBoard2;
}

export interface PerBoard3 {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface CustomFields {
  perBoard: PerBoard3;
}

export interface PerBoard4 {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Labels {
  perBoard: PerBoard4;
}

export interface OpenPerBoard2 {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface TotalPerBoard2 {
  status: string;
  disableAt: number;
  warnAt: number;
}

export interface Lists {
  openPerBoard: OpenPerBoard2;
  totalPerBoard: TotalPerBoard2;
}

export interface Limits {
  attachments: Attachments;
  boards: Boards;
  cards: Cards;
  checklists: Checklists;
  customFields: CustomFields;
  labels: Labels;
  lists: Lists;
}

export interface Membership {
  id: string;
  idMember: string;
  memberType: string;
  unconfirmed: boolean;
}

export interface BackgroundImageScaled {
  width: number;
  height: number;
  url: string;
}

export interface Prefs {
  permissionLevel: string;
  voting: string;
  comments: string;
  invitations: string;
  selfJoin: boolean;
  cardCovers: boolean;
  cardAging: string;
  calendarFeedEnabled: boolean;
  background: string;
  backgroundImage: string;
  backgroundColor: string;
  backgroundImageScaled: BackgroundImageScaled[];
  backgroundTile: boolean;
  backgroundBrightness: string;
  backgroundBottomColor: string;
  backgroundTopColor: string;
  canBePublic: boolean;
  canBeOrg: boolean;
  canBePrivate: boolean;
  canInvite: boolean;
}

export interface LabelNames {
  green: string;
  yellow: string;
  orange: string;
  red: string;
  purple: string;
  blue: string;
  sky: string;
  lime: string;
  pink: string;
  black: string;
}

export interface Board {
  id: string;
  name: string;
  desc: string;
  descData?: any;
  closed: boolean;
  idOrganization: string;
  invited: boolean;
  limits: Limits;
  memberships: Membership[];
  pinned: boolean;
  starred: boolean;
  url: string;
  prefs: Prefs;
  invitations: any[];
  shortLink: string;
  subscribed: boolean;
  labelNames: LabelNames;
  powerUps: any[];
  dateLastActivity: Date;
  dateLastView: Date;
  shortUrl: string;
  idTags: any[];
  datePluginDisable?: any;
}

export type BoardsCollection = Array<Board>;
