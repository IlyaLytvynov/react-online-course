import { ACTION_TYPES } from './types';

export const setToken = (token: string) => ({
  type: ACTION_TYPES.SET_TOKEN,
  payload: token
});
