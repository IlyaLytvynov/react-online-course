import { subscribe } from '../../utils';
import { ACTION_TYPES } from './types';
import { Worker } from '../../utils';
import { Action } from '../types';
import { request } from '../http';
import { setBoard, setBoards } from './actions';

const fetchBoardsWorker: any = ({
  action,
  next,
  dispatch,
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  console.log('FETCHED');

  dispatch(
    request({
      path: '/members/me/boards',
      authRequired: true,
      onSuccess: (data) => {
        console.log(data);
        dispatch(setBoards(data));
      },
      onError: (error) => {
        console.log(error);
      },
    })
  );
};

const updateBoardsWorker: any = ({
  action,
  next,
  dispatch,
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  console.log('UPDATED');
  const {
    payload: { id, ...rest },
  } = action;
  console.log(action);
  dispatch(
    request({
      path: `/boards/${id}`,
      method: 'PUT',
      authRequired: true,
      body: rest,
      onSuccess: (data) => {
        console.log('>>>', data);
      },
      onError: (error) => {
        console.log(error);
      },
    })
  );
};

const addBoardWorker: any = ({
  action,
  next,
  dispatch,
}: {
  action: any;
  next: any;
  dispatch: any;
}) => {
  const {
    payload: { name },
  } = action;
  dispatch(
    request({
      path: `/boards`,
      method: 'POST',
      authRequired: true,
      additionalQueryParams: `&name=${name}`,
      onSuccess: (data) => {
        dispatch(setBoard(data));
      },
      onError: (error) => {
        console.log(error);
      },
    })
  );
};

const fetchMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.FETCH, fetchBoardsWorker)(next, dispatch);

const putMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.EDIT_BOARD, updateBoardsWorker)(next, dispatch);

const addMiddleware =
  ({ dispatch }: any) =>
  (next: any) =>
    subscribe(ACTION_TYPES.ADD_BOARD, addBoardWorker)(next, dispatch);

export const boardsMiddleware = [fetchMiddleware, putMiddleware, addMiddleware];
