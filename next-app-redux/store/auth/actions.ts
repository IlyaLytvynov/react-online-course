import { ACTION_TYPES } from './constants';
import { Token } from '../../models/Auth';

export const fetchToken = (code: string) => ({
  type: ACTION_TYPES.FETCH_TOKEN,
  payload: code
});

export const setToken = (token: Token | undefined) => ({
  type: ACTION_TYPES.SET_TOKEN,
  payload: token
});

export const signOut = () => ({
  type: ACTION_TYPES.SIGN_OUT
});
