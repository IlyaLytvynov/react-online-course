export interface Action<T, P = any> {
  type: T;
  payload?: P;
}
