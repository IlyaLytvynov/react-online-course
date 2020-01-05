import { MyCoolStore } from './MyCoolStore';
import { UiStore } from './UiStire';
import { AuthStore } from './Auth';
import { BoardsStore } from './Boards';
import { CardsStore } from './Cards';
import { NotificationsStore } from './Notifications';
import { BoardsApi } from '../apis/BoardsApi';
import { CardsApi } from '../apis/CardsApi';
import { ListsApi } from '../apis/ListsApi';
import { ListsStore } from './Lists';

export enum STORE_IDS {
  UI = 'ui',
  COOL_STORE = 'myCollStore',
  AUTH = 'auth',
  BOARDS = 'boards',
  NOTIFICATION = 'notifications',
  CARDS = 'cards',
  LISTS = 'lists'
}

const apis = {
  [STORE_IDS.BOARDS]: new BoardsApi(),
  [STORE_IDS.CARDS]: new CardsApi(),
  [STORE_IDS.LISTS]: new ListsApi()
};

const auth = new AuthStore();
const notifications = new NotificationsStore();

const stores = {
  [STORE_IDS.COOL_STORE]: new MyCoolStore(),
  [STORE_IDS.UI]: new UiStore(),
  [STORE_IDS.AUTH]: auth,
  [STORE_IDS.NOTIFICATION]: notifications,
  [STORE_IDS.CARDS]: new CardsStore(auth, apis[STORE_IDS.CARDS], notifications),
  [STORE_IDS.BOARDS]: new BoardsStore(
    auth,
    apis[STORE_IDS.BOARDS],
    notifications
  ),
  [STORE_IDS.LISTS]: new ListsStore(auth, apis[STORE_IDS.LISTS], notifications)
};

export { stores };
