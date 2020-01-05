import { makeUrl } from '../utils/makeUrl';
import { CardsCollection } from '../types/Cards';

export class ListsApi {
  public async fetch(token: string, id: string): Promise<CardsCollection> {
    try {
      const response = await fetch(
        makeUrl(`/1/boards/${id}/lists`, true, token)
      );
      if (response.status >= 400) {
        throw response;
      }
      const list = await response.json();
      return list;
    } catch (e) {
      throw e;
    }
  }
}
