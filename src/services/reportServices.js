import request from '@/utils/request';

const reportServices = {
  get_callCenterData(data) {
    return request({
      url: `/reports/calls_center_data`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  get_KitDetailData(data) {
    return request({
      url: `/reports/kit_details_data`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  get_GeneralIndicators(data) {
    return request({
      url: `/reports/general_indicators`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  get_ExpiredOrders() {
    return request({
      url: `/reports/expired_orders`,
      method: 'post',
      headers:{'Content-Type':'application/json'}
    });
  },
  get_ActivityOrders(data) {
    return request({
      url: `/reports/activity_orders`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  },
  getZones() {
    return request({
      url: `/reports/zones`,
      method: 'post',
      headers:{'Content-Type':'application/json'}
    });
  },
  getDashboardData(data) {
    return request({
      url: `/reports/dashboard_data`,
      method: 'post',
      data: data,
      headers:{'Content-Type':'application/json'}
    });
  }
};


export default reportServices;