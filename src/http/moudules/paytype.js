/* eslint-disable */
import axios from '../axios'

//支付类型
export const getpayTypeList= () => {
  return axios({
    url: '/payType/list',
    method: 'get',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},

  })
}








