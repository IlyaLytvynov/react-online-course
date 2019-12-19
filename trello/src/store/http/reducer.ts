import { ActionHttp } from './types';

const INITIAL_STATE = {};

export interface HTTPState {}

export default (state: HTTPState = INITIAL_STATE, action: ActionHttp) => {
  return state;
};
