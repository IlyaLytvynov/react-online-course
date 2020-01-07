import axios from 'axios';
// import getConfig from 'next/config';
// const t = getConfig();s
const key = '588745fe0494eda1c54354b97d7885c5f94a97a359ce835605acf2df6163ba8c';
const apiUrl = 'https://api.unsplash.com';

interface RequestOptions {
  isProtected?: boolean;
  token?: string;
}

export class ApiRequest {
  public static get = async <T>(uri: string, _options: RequestOptions = {}) => {
    try {
      // const { token } = options;
      const requestOptions = {
        headers: {
          Authorization: `Client-ID ${key}`
        }
      };

      const response = await axios.get<T>(apiUrl + uri, requestOptions);
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  public static post = async <T>(uri: string) => {
    try {
      const requestOptions = {};

      const response = await axios.post<T>(apiUrl + uri, requestOptions);

      return response.data;
    } catch (e) {
      throw e;
    }
  };
}
