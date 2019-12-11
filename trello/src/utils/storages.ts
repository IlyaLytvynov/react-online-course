export const setToLocalStorage = <P>(key: string, data: P) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const getFromLocalStorage = <T>(key: string): T => {
  return JSON.parse(window.localStorage.getItem(key) || '{}');
};
