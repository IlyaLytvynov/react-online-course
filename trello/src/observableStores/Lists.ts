import { observable, computed } from 'mobx';
import { AuthStore } from './Auth';
import { ListsApi } from '../apis/ListsApi';
import { NotificationsStore } from './Notifications';
import { List } from '../types';
import { LOADING_STATUS } from '../types/LoadingStatus';

export class ListsStore {
  @observable private _entities: Map<string, List> = new Map<string, List>();
  @observable private _loadingPhase: LOADING_STATUS = LOADING_STATUS.UNSET;

  constructor(
    private _auth: AuthStore,
    private _api: ListsApi,
    private _notifications: NotificationsStore
  ) {}

  @computed
  public get entities() {
    return this._entities;
  }

  @computed
  public get isLoading(): boolean {
    return this._loadingPhase === LOADING_STATUS.PENDING;
  }

  public async fetchLists(boardId: string) {
    this._loadingPhase = LOADING_STATUS.PENDING;
    try {
      const { token } = this._auth;
      const list = await this._api.fetch(token, boardId);
      this._loadingPhase = LOADING_STATUS.SUCCESS;
      this._entities = list.reduce(
        (entities: Map<string, List>, list: List) => {
          entities.set(list.id, list);
          return entities;
        },
        new Map<string, List>()
      );
    } catch (e) {
      this._notifications.show('Something went wrong!');
      this._loadingPhase = LOADING_STATUS.ERROR;
    }
  }
}
