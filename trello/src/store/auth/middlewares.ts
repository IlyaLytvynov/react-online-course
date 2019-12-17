const authMiddleware = () => (next: any) => (action: any) => {
  next(action);
};

export const authMiddlewares = [authMiddleware];
