import { observable, computed, toJS, action, reaction, autorun } from 'mobx';
import { AuthStore } from './Auth';
import { makeUrl } from '../utils/makeUrl';
import { BoardsApi } from '../apis/BoardsApi';
import { BoardsCollection, Board } from '../types';
import { NotificationsStore } from './Notifications';
import { LOADING_STATUS } from '../types/LoadingStatus';

export class BoardsStore {
  @observable private _entities: Map<string, Board> = new Map();
  @observable private _loadingPhase: LOADING_STATUS = LOADING_STATUS.UNSET;

  constructor(
    private _auth: AuthStore,
    private _api: BoardsApi,
    private _notifications: NotificationsStore
  ) {
    autorun(() => {
      console.log('CHANGED!', this._entities);
    });
  }

  @computed
  public get entities() {
    return this._entities;
  }

  @computed
  public get isLoading(): boolean {
    return this._loadingPhase === LOADING_STATUS.PENDING;
  }

  public getBoard = (id: string) => this._entities.get(id);

  public async fetchBoard(id: string) {
    this._loadingPhase = LOADING_STATUS.PENDING;
    try {
      const { token } = this._auth;
      const board = await this._api.fetchOne(token, id);
      this._entities.set(board.id, board);
      this._loadingPhase = LOADING_STATUS.SUCCESS;
    } catch (e) {
      this._notifications.show('Something went wrong!');
      this._loadingPhase = LOADING_STATUS.ERROR;
    }
  }

  @action
  public async fetchBoards() {
    this._loadingPhase = LOADING_STATUS.PENDING;
    try {
      const { token } = this._auth;
      const list = await this._api.fetch(token);
      this._entities = list.reduce((map, board) => {
        map.set(board.id, board);
        return map;
      }, new Map());
      this._loadingPhase = LOADING_STATUS.SUCCESS;
    } catch (e) {
      this._notifications.show('Something went wrong!');
      this._loadingPhase = LOADING_STATUS.ERROR;
    }
  }
}
