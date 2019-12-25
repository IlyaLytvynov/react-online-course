import { observable, computed } from 'mobx';

interface ScreenDimansions {
  w: number;
  h: number;
}

export class UiStore {
  @observable
  private _isModalOpen: boolean = false;
  @observable
  private _screenDemansions: ScreenDimansions = {
    w: 0,
    h: 0
  };

  constructor() {
    this.subscribeToScreenResize();
  }

  @computed
  public get isModalOpen() {
    return this._isModalOpen;
  }

  @computed
  public get screen(): ScreenDimansions {
    return this._screenDemansions;
  }

  private onScreenChange(w: number, h: number) {
    this._screenDemansions = { w, h };
  }

  private subscribeToScreenResize() {
    window.onresize = (e: any) => {
      console.log(window.innerHeight, window.innerWidth);
      this.onScreenChange(window.innerWidth, window.innerHeight);
    };
  }
}
