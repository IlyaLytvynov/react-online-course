import { Action } from '../types';

export interface RequestPayload<P = any> {
  path: string;
  authRequired?: boolean;
  onSuccess?: (p?: P) => void;
  onError?: (e?: any) => void;
}

export enum ACTION_TYPES {
  REQUEST = '@@HTTP/REQUEST',
  SUCCESS = '@@HTTP/SUCCESS',
  ERROR = '@@HTTP/ERROR'
}

export interface ActionHttp<P = any>
  extends Action<ACTION_TYPES>,
    RequestPayload<P> {}
