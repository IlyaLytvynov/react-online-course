import uuid from 'uuid/v4';

import { ACTION_TYPES } from './types';
import { Worker, subscribe } from '../../utils';
import { getToken } from '../auth';
import { makeUrl } from '../../utils/makeUrl';

const requestWorker: Worker<any> = async ({ action, next, getState }) => {
  const requestId = uuid();
  const { path, onSuccess, method = 'GET', authRequired } = action;
  const appState = getState!();
  const token = getToken(appState);

  const options: any = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const response = await fetch(makeUrl(path, authRequired, token), options);

  if (response.status >= 400) {
    console.log('ERROR');
  }

  const data = await response.json();
  onSuccess(data);
};

const requestMiddleware = ({ dispatch, getState }: any) => (next: any) =>
  subscribe(ACTION_TYPES.REQUEST, requestWorker)(next, dispatch, getState);

export const httpMiddlewares = [requestMiddleware];
