import request from '@/utils/request';

const importService = {
  callCenterReport(data, token = "") {
    return request({
      url: `/import/callcenter`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      }
    });
  },
  kitReport(data, token = "") {
    return request({
      url: `/import/kitreport`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      }
    });
  },
  kitDetailReport(data, token = "") {
    return request({
      url: `/import/kitdetailsreport`,
      method: 'post',
      data: data,
      headers: {
        'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`
      }
    });
  }
};

export default importService;