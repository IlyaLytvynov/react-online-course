import { Action } from '../types';

export interface RequestPayload<P = any, B = any> {
  path: string;
  body?: B;
  authRequired?: boolean;
  method?: 'PUT' | 'GET' | 'POST' | 'DELETE';
  additionalQueryParams?: string;
  onSuccess?: (p?: P) => void;
  onError?: (e?: any) => void;
}

export enum ACTION_TYPES {
  REQUEST = '@@HTTP/REQUEST',
  SUCCESS = '@@HTTP/SUCCESS',
  ERROR = '@@HTTP/ERROR',
}

export interface ActionHttp<P = any>
  extends Action<ACTION_TYPES>,
    RequestPayload<P> {}
