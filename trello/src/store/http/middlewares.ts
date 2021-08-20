import uuid from 'uuid/v4';

import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';
import { getToken } from '../auth';
const { REACT_APP_API_DOMAIN, REACT_APP_API_KEY } = process.env;

const makeUrl = (
  path: string,
  authRequired: boolean,
  token: string,
  addParams: string
) => {
  let url = REACT_APP_API_DOMAIN + path + `?key=${REACT_APP_API_KEY}`;
  if (addParams) {
    url += addParams;
  }
  if (authRequired && token) {
    url = url + `&token=${token}`;
  }

  return url;
};

const requestWorker: Worker<any> = async ({ action, next, getState }) => {
  const requestId = uuid();
  const {
    path,
    onSuccess,
    method = 'GET',
    authRequired,
    body,
    additionalQueryParams,
  } = action;
  const appState = getState!();
  const token = getToken(appState);
  console.log(additionalQueryParams);
  const options: any = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body,
    mode: 'cors',
  };

  const response = await fetch(
    makeUrl(path, authRequired, token, additionalQueryParams),
    options
  );

  if (response.status >= 400) {
    console.log('ERROR');
  }
  if (response.status === 0) {
    return;
  }
  const data = await response.json();
  onSuccess(data);
};

const requestMiddleware =
  ({ dispatch, getState }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, dispatch, getState);

export const httpMiddlewares = [requestMiddleware];
