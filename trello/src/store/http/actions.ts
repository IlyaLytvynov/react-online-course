import { ActionHttp, ACTION_TYPES, RequestPayload } from './types';

export const request = (p: RequestPayload): ActionHttp => ({
  type: ACTION_TYPES.REQUEST,
  ...p
});
