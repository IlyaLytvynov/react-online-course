import uuid from 'uuid/v4';

import { ACTION_TYPES } from './types';

export interface InitState {
  sessionId?: string
}

export default function (state: InitState = {}, action: any) {
  switch (action.type) {
    case ACTION_TYPES.START:
      return {};
    case ACTION_TYPES.END:
      return {
        sessionId: uuid(),
      };
    default:
      return state;
  }
}
