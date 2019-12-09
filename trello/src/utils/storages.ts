export const setToLocalStorage = async (key: string, data: any) => {
  window.localStorage.setItem(key, data);
};

export const getFromLocalStorage = async (key: string) => {
  window.localStorage.getItem(key);
};
