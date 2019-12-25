const { REACT_APP_API_DOMAIN, REACT_APP_API_KEY } = process.env;
export const makeUrl = (path: string, authRequired: boolean, token: string) => {
  let url = REACT_APP_API_DOMAIN + path + `?key=${REACT_APP_API_KEY}`;
  if (authRequired && token) {
    url = url + `&token=${token}`;
  }
  return url;
};
