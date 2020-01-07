import { Token } from '../../models/Auth';
import { Action } from '../types';
import { ACTION_TYPES } from './constants';

export interface AuthState {
  token: Token | undefined;
}

export const INITIAL_STATE = {
  token: undefined,
};

export default (state: AuthState = INITIAL_STATE, action: Action<Token>) => {
  switch (action.type) {
    case ACTION_TYPES.SET_TOKEN:
      return {...state, token: action.payload};
    case ACTION_TYPES.CLEAR_TOKEN:
      return {...INITIAL_STATE};
    default:
      return state;
  }
};
