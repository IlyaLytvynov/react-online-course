import { observable, action } from 'mobx';

class MyCoolStore {
  @observable public value: number = 0;

  @action
  public increase = () => {
    this.value = this.value + 1;
  };
}

export { MyCoolStore };
