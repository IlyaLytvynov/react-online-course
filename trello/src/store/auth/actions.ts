import { ACTION_TYPES } from './types';

export const setToken = (token: string) => ({
  type: ACTION_TYPES.SET_TOKEN,
  payload: token
});

export const readToken = () => ({
  type: ACTION_TYPES.READ_TOKEN
});

export const logOut = () => ({
  type: ACTION_TYPES.LOGOUT
});
