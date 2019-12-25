import { BoardsCollection } from '../types';
import { makeUrl } from '../utils/makeUrl';

export class BoardsApi {
  public async fetch(token: string): Promise<BoardsCollection> {
    try {
      const response = await fetch(
        makeUrl('/1/members/me/444boards', true, token)
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
