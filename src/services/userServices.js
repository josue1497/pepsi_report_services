import request from '@/utils/request';

const userServices = {
  all_users() {
    console.log('all_users()');
    return request({
      url: `/user`,
      method: 'get',
      headers:{'Content-Type':'application/json'}
    });
  }
};

export default userServices;