import { Action } from '../types';
import { ACTION_TYPES } from './types';
import { setToLocalStorage, subscribe, getFromLocalStorage } from '../../utils';
import { setToken } from './actions';

const APP_TOKEN = 'TREELLO_CUSTOM_APP_TOKEN';

const authMiddleware = ({ dispatch }: any) => (next: any) => (
  action: Action<ACTION_TYPES>
) => {
  if (action.type === ACTION_TYPES.SET_TOKEN) {
    console.log('TOKEN SET!');
    setToLocalStorage(APP_TOKEN, action.payload);
    // setTimeout(() => {
    //   dispatch(
    //     request({
    //       path:
    //         'https://my-json-server.typicode.com/ilyalytvynov/ads-box-server/movies',
    //       onSuccess: (data: any) => {
    //         console.log('SUCCESS', data);
    //       }
    //     })
    //   );
    // });
  }
  next(action);
};

const readTokenWorker = ({ action, next, dispatch }: any) => {
  const token = getFromLocalStorage(APP_TOKEN);
  if (token) {
    dispatch(setToken(token));
  }
  next(action);
};

const readTokenMiddleware = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.READ_TOKEN, readTokenWorker)(next, dispatch);

export const authMiddlewares = [authMiddleware, readTokenMiddleware];
