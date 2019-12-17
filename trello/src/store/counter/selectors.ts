import { AppState } from '../';

export const getCount = (state: AppState): number => state.counter.count;
