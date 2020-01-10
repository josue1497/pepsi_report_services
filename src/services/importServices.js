import request from '@/utils/request';

const importService = {
  callCenterReport(data) {
    return request({
      url: `/import/callcenter`,
      method: 'post',
      data: data,
      headers:{'Content-Type': 'multipart/form-data'}
    });
  }
};

export default importService;