/* eslint-disable */
import axios from '../axios'

export const pay = (data) => {
    return axios({
      url: '/order/pay',
      method: 'post',
      params: data,
    })
};
