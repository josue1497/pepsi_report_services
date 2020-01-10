import axios from 'axios';
import global from '@/constants/GlobalConstants'

// axios
const request = axios.create({
  baseURL: global.domainUrl, // api base_url
  timeout: 300000
});

// response
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (response.status !== 200 && res.code !== 20000) {
     alert({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      });

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        alert('You have been logged out, you can cancel to stay on this page, or log in again');
      }
      return Promise.reject(new Error('error'));
    }
    if (response.data instanceof Blob) {
      return response;
    }
    return response.data;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default request;
