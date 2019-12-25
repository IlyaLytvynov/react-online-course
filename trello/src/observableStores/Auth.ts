import { observable } from 'mobx';
import { APP_TOKEN } from '../constants';
import { getFromLocalStorage } from '../utils';

export class AuthStore {
  @observable token: string = '';

  constructor() {
    this.readToken();
  }

  private readToken() {
    const token = getFromLocalStorage(APP_TOKEN);
    if (token) {
      this.token = token;
    }
  }
}
