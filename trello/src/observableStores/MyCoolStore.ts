import { observable, action, computed } from 'mobx';

class MyCoolStore {
  @observable private _value: number = 0;

  @action
  public increase = () => {
    this._value = this._value + 1;
  };

  @computed
  public get value() {
    return 'My cool value' + this._value;
  }
}

export { MyCoolStore };
