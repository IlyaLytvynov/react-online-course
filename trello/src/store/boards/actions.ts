import { ArrayDestructuringAssignment } from 'typescript';
import { ACTION_TYPES } from './types';

export const fetchBoards = () => ({
  type: ACTION_TYPES.FETCH,
});

export const setBoards = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_BOARDS,
  payload: data,
});

export const setBoard = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_SINGLE_BOARD,
  payload: data,
});

export const editBoardName = (id: string, name: string) => ({
  type: ACTION_TYPES.EDIT_BOARD,
  payload: { id, name },
});

export const addBoard = (name: string) => ({
  type: ACTION_TYPES.ADD_BOARD,
  payload: { name },
});
