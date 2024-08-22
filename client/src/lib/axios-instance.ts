import axios from 'axios';
import Cookies from 'js-cookie';

const apiEndpoint = import.meta.env.VITE_SERVER_URL;
if (!apiEndpoint) throw new Error('Are you sure about the api url');

/**
 * prefill api calls with the access token and a default base route
 */
export const api = axios.create({
  baseURL: `${apiEndpoint}/api/`,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
