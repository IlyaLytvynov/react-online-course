import { observable, computed, toJS } from 'mobx';
import { AuthStore } from './Auth';
import { makeUrl } from '../utils/makeUrl';
import { BoardsApi } from '../apis/BoardsApi';
import { BoardsCollection } from '../types';
import { NotificationsStore } from './Notifications';

export class BoardsStore {
  @observable private _list: BoardsCollection = [];

  constructor(
    private _auth: AuthStore,
    private _api: BoardsApi,
    private _notifications: NotificationsStore
  ) {}

  @computed
  public get list() {
    return this._list;
  }

  public async fetchBoards() {
    try {
      const { token } = this._auth;
      const list = await this._api.fetch(token);
      this._list = list;
    } catch (e) {
      this._notifications.show('Something went wrong!');
      // this._auth.logOut()
    }
  }
}
