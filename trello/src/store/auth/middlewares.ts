import { Action } from '../types';
import { ACTION_TYPES } from './types';
import { setToLocalStorage, subscribe, getFromLocalStorage } from '../../utils';
import { setToken } from './actions';

import { ROUTES_URLS } from '../../components/App/routes';
import { navigate } from '../router';
import { push } from 'connected-react-router';

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

const setTokenWorker = ({ action, next, dispatch }: any) => {
  console.log('asd', action.payload);
  setToLocalStorage(APP_TOKEN, action.payload);
  console.log('>>>>>>>>>>');
  // dispatch(navigate(ROUTES_URLS.DASHBOARD));
  dispatch(push(ROUTES_URLS.DASHBOARD));
  next(action);
};

const readTokenWorker = ({ action, next, dispatch }: any) => {
  const token = getFromLocalStorage(APP_TOKEN);
  if (token) {
    dispatch(setToken(token));
  }
  next(action);
};

const readTokenMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, dispatch);

const setTokenMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.SET_TOKEN, setTokenWorker)(next, dispatch);

export const authMiddlewares = [setTokenMiddleware, readTokenMiddleware];
