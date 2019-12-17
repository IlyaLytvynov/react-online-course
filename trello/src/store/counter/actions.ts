import { ACTION_TYPES } from './types';

// ACTION CREATOR
export const increaseCount = () => ({
  type: ACTION_TYPES.INCREASE_COUNT
});

export const decreaseCount = () => ({
  type: ACTION_TYPES.DECREASE_COUNT
});
