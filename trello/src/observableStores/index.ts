import { MyCoolStore } from './MyCoolStore';
import { UiStore } from './UiStire';
import { AuthStore } from './Auth';
import { BoardsStore } from './Boards';
import { NotificationsStore } from './Notifications';
import { BoardsApi } from '../apis/BoardsApi';

export enum STORE_IDS {
  UI = 'ui',
  COOL_STORE = 'myCollStore',
  AUTH = 'auth',
  BOARDS = 'boards',
  NOTIFICATION = 'notifications'
}

const apis = {
  [STORE_IDS.BOARDS]: new BoardsApi()
};

const auth = new AuthStore();
const notifications = new NotificationsStore();

const stores = {
  [STORE_IDS.COOL_STORE]: new MyCoolStore(),
  [STORE_IDS.UI]: new UiStore(),
  [STORE_IDS.AUTH]: auth,
  [STORE_IDS.NOTIFICATION]: notifications,
  [STORE_IDS.BOARDS]: new BoardsStore(
    auth,
    apis[STORE_IDS.BOARDS],
    notifications
  )
};

export { stores };
