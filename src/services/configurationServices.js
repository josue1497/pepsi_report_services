import request from '@/utils/request';

const configService = {
  getAll() {
    return request({
      url: `/config/get_all`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  },
  saveConfig(data) {
    return request({
      url: `/config/save_config`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

export default configService;