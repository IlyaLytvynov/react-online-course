import { Store } from 'redux';
import axios from 'axios';

import { Action } from '../types';
import { ACTION_TYPES } from './constants';
import { Token } from '../../models/Auth';
import { setToken } from './actions';

const key = process.env.REACT_APP_CLIENT_ID;
const secret = process.env.REACT_APP_SECRET;
const redirectUrl = process.env.REACT_APP_REDIRECT_URI;

const fetchToken = async (code: string) => {
  try {
    const AUTH_URL = `https://unsplash.com/oauth/token?client_id=${key}&client_secret=${secret}&redirect_uri=${redirectUrl}&code=${code}&grant_type=${'authorization_code'}`;
    const response = await axios.post<Token>(AUTH_URL);
    return response.data;
  } catch (e) {
    throw e;
  }
};

const fetchMiddleware = ({ dispatch }: Store) => (
  next: (action: Action<any>) => void
) => (action: Action<any>) => {
  if (action.type === ACTION_TYPES.FETCH_TOKEN) {
    const code = action.payload;
    fetchToken(code).then((token: Token) => {
      dispatch(setToken(token));
    });
  }

  next(action);
};

const signOutMiddleware = ({ dispatch }: Store) => (
  next: (action: Action<any>) => void
) => (action: Action<any>) => {
  if (action.type === ACTION_TYPES.SIGN_OUT) {
    dispatch(setToken(undefined));
  }

  next(action);
};

export const authMiddlewares = [fetchMiddleware, signOutMiddleware];
