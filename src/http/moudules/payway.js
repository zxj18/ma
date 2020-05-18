/* eslint-disable */
import axios from '../axios';

//支付类型
export const getpayWayList = data => {
  console.log(data);
  return axios({
    url: '/payWay/list',
    method: 'get',

    params: data
  });
};
