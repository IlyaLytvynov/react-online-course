import { ACTION_TYPES } from './types';
import { initEnd, initStart } from './actions';
import { subscribe } from '../../utils/redux';
import { readToken } from '../auth';

const initWorker = ({ action, dispatch, next }: any) => {
  dispatch(initStart());
  dispatch(readToken());
  dispatch(initEnd());
  next(action);
};

const init = ({ dispatch }: any) => (next: any) =>
  subscribe(ACTION_TYPES.INIT, initWorker)(next, dispatch);
export const initMiddleware = [init];
