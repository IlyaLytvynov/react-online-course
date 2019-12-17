import { ACTION_TYPES } from './types';

const INITIAL_STATE = {
  token: ''
};

export interface AuthState {
  token: string;
}

export default (state: AuthState = INITIAL_STATE, { type, payload }: any) => {
  switch (type) {
    case ACTION_TYPES.SET_TOKEN:
      return { ...state, token: payload };
    default:
      return state;
  }
};
