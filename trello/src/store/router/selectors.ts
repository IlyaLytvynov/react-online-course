import { AppState } from '../index';

export const getPathName = (state: AppState) => state.router.location.pathname;
export const getSegments = (state: AppState) => {
  const arr = state.router.location.pathname.split('/');
  return arr.filter((segment: string) => !!segment);
};
