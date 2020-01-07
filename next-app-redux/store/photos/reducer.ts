import { ACTION_TYPES } from './actionTypes';
import { Action } from '../types';
import { Photo } from '../../models';
import { Pagination } from '../../models/Pagination';

export interface PhotosState {
  list: Array<Photo>;
  pagination: Pagination;
}

const INITIAL_STATE = {
  list: [],
  pagination: new Pagination(40)
};

export default (
  appState: PhotosState = INITIAL_STATE,
  action: Action<Array<Photo>>
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LIST:
      return { ...appState, list: action.payload };
    case ACTION_TYPES.SET_PAGINATION:
      return { ...appState, pagination: action.payload };
    default:
      return appState;
  }
};
