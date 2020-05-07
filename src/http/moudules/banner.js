/* eslint-disable */
import axios from '../axios'


export const list = (data) => {
    return axios({
      url: '/banner/list',
      // headers:{'Content-Type':'application/x-www-form-urlencoded'},
      method: 'get',
      params: data,
    })
};
