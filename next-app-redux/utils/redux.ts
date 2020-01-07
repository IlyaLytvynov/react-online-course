export type Worker<T extends {type: string}> = (action: T, next: any, dispatch?: any, getState?: () => any) => void

export const subscribe = <T extends {type: string}>(actionType: string | Array<string>, worker: Worker<T>) =>
  (next: any, dispatch?: any, getState?: () => any) =>
    /** Exactly this is action handler will be called at middleware */
    (action: T) => {
      const isWatchedAction: boolean = typeof actionType !== 'string' ?
        actionType.indexOf(action.type) !== -1
        : actionType === action.type;

      if (isWatchedAction) {
        worker(action, next, dispatch, getState);
      } else {
        next(action);
      }
    };
