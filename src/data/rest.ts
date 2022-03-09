import { useLogger } from '../utils/logger';
import { useAuthStorage } from './auth/AuthStorage';
import { useInitStorage } from './init/InitStorage';

type Methods = 'GET' | 'POST';

export function useRest() {
  const { config } = useInitStorage();
  const { user } = useAuthStorage();
  const { error } = useLogger('InitApi');

  async function fetching(
    url: string,
    method: Methods,
    credentials?: boolean,
    data?: any
  ) {
    let options: RequestInit = {
      method,
    };

    if (credentials) {
      const reqHeaders = new Headers();
      reqHeaders.append('Content-Type', 'application/json');
      options.headers = reqHeaders;
      if (user?.token) reqHeaders.append('Authorization', user?.token);
      options.credentials = 'include';
    }

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      switch (response.status) {
        case 200:
          return response;
        case 404:
          error('Not found url: ', url);
          return response;
        case 403:
          error('Forbidden url or wrong login/password: ', url);
          return response;
        case 503:
          error('Service Unavailable', url);
          return response;
        default:
          return response;
      }
    } catch (err) {
      error('Cant fetch url: ', url);
    }
  }

  function get(url: string) {
    return fetching(`${config.apiUrl}${url}`, 'GET', true);
  }

  function post(url: string, data: any) {
    return fetching(`${config.apiUrl}${url}`, 'POST', true, data);
  }

  function getLocal(url: string) {
    return fetching(url, 'GET');
  }

  function postLogin(data: { login: string; password: string }) {
    return fetching(`${config.authUrl}`, 'POST', true, data);
  }

  return {
    get,
    getLocal,
    post,
    postLogin,
  };
}
