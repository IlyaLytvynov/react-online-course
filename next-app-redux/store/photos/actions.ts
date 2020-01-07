import { Photo } from '../../models';
import { ACTION_TYPES } from './actionTypes';
import { Pagination } from '../../models/Pagination';
import { getPagination } from './selectors';
import fetch from 'isomorphic-unfetch';

const t = () => {
  return new Promise(resolve => {
    console.log('Started interval');
    setTimeout(() => {
      console.log('Interval invoked');
      resolve();
    }, 2000);
  });
};

export const setList = (list: Array<Photo>) => ({
  type: ACTION_TYPES.SET_LIST,
  payload: list
});

export const fetchList = () => async (dispatch, getState) => {
  try {
    const state = getState();
    const { perPage, page, orderBy } = getPagination(state);
    const response = await fetch(
      `https://api.unsplash.com/photos?per_page=${perPage}&page=${page}&order_by=${orderBy}`,
      {
        headers: {
          Authorization: `Client-ID ${'0b42abb24c8adf1966a72f20f38f8d06a0f90301a82df72da8a6a70039c0f598'}`
        }
      }
    );
    const data = await response.json();
    console.log(data.length);
    await t();

    dispatch(setList(data));
  } catch (e) {
    throw e;
  }
};

export const setPagination = (pagination: Pagination) => ({
  type: ACTION_TYPES.FETCH_LIST,
  payload: pagination
});

export const changePagination = (pagination: Pagination) => ({
  type: ACTION_TYPES.CHANGE_PAGINATION,
  payload: pagination
});
