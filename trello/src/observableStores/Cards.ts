import { observable, computed, toJS } from 'mobx';
import { AuthStore } from './Auth';
import { CardsApi } from '../apis/CardsApi';
import { BoardsCollection } from '../types';
import { NotificationsStore } from './Notifications';
import { CardsCollection } from '../types/Cards';

export class CardsStore {
  @observable private _list: CardsCollection = [];

  constructor(
    private _auth: AuthStore,
    private _api: CardsApi,
    private _notifications: NotificationsStore
  ) {}

  @computed
  public get list() {
    return this._list;
  }

  public async fetchCards(id: string) {
    try {
      const { token } = this._auth;
      const list = await this._api.fetch(token, id);
      this._list = list;
    } catch (e) {
      this._notifications.show('Something went wrong!');
    }
  }
}
