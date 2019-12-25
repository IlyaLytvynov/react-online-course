import { observable, action, computed } from 'mobx';

// import { observable } from "mobx";

export class NotificationsStore {
  @observable _notifications: Array<{ message: string; id: string }> = [];

  @computed
  get notifications() {
    return this._notifications;
  }

  @action
  show(message: string) {
    this._notifications.push({ message, id: '' + Date.now() });
    console.log(this._notifications);
  }
}
