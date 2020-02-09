import request from '@/utils/request';

const userServices = {
  all_users() {
    return request({
      url: `/user`,
      method: 'get',
      headers:{'Content-Type':'application/json'}
    });
  },
  activateuser(data){
    return request({
      url: `/user/activate`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  createUser(data){
    return request({
      url: `/user`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  updateUser(data, user_id){
    return request({
      url: `/user/${user_id}`,
      method: 'put',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  changePassword(data){
    return request({
      url: `/user/change_password?user_id=${data.user_id}&new_pass=${data.new_pass}&old_pass=${data.old_pass}`,
      method: 'post',
      headers:{'Content-Type':'application/json'}
    });
  },
  resetPassword(data){
    return request({
      url: `/user/reset_pass?user_id=${data.user_id}&new_pass=${data.new_pass}`,
      method: 'post',
      headers:{'Content-Type':'application/json'}
    });
  },
};

export default userServices;