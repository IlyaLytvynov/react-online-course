import { observable, computed, toJS, reaction } from 'mobx';
import { AuthStore } from './Auth';
import { CardsApi } from '../apis/CardsApi';
import { NotificationsStore } from './Notifications';
import { CardsCollection } from '../types/Cards';
import { LOADING_STATUS } from '../types/LoadingStatus';

export class CardsStore {
  @observable private _entities: Map<string, CardsCollection> = new Map();
  @observable private _loadingPhase: LOADING_STATUS = LOADING_STATUS.UNSET;

  constructor(
    private _auth: AuthStore,
    private _api: CardsApi,
    private _notifications: NotificationsStore
  ) {}

  @computed
  public get isLoading(): boolean {
    return this._loadingPhase === LOADING_STATUS.PENDING;
  }

  @computed
  public get entities() {
    return this._entities;
  }

  public async fetchCards(id: string) {
    this._loadingPhase = LOADING_STATUS.PENDING;
    try {
      const { token } = this._auth;
      const list = await this._api.fetch(token, id);
      this._entities = this.normaliseStructure(list);
      this._loadingPhase = LOADING_STATUS.SUCCESS;
    } catch (e) {
      this._notifications.show('Something went wrong!');
      this._loadingPhase = LOADING_STATUS.ERROR;
    }
  }

  private normaliseStructure(
    cards: CardsCollection
  ): Map<string, CardsCollection> {
    const listIdToCardsMap = new Map<string, CardsCollection>();

    for (let card of cards) {
      const existingEntities = listIdToCardsMap.get(card.idList);
      if (!existingEntities) {
        listIdToCardsMap.set(card.idList, [card]);
      } else {
        existingEntities.push(card);
      }
    }
    console.log(listIdToCardsMap);
    return listIdToCardsMap;
  }
}
