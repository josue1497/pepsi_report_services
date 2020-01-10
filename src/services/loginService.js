import request from '@/utils/request';

const loginService = {
  login(data) {
    return request({
      // url: `/auth/login?email=${data.username}&password=${data.password}`,
      url: `/auth/login`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  }
};

export default loginService;