/* eslint-disable */
import axios from '../axios'


export const getSignList = () => {
  return axios({
    url: '/sign/list',
    method: 'get'
  })
};


export const getCode = (data) => {
  return axios({
    url: '/app/getCode',
    method: 'get',
    params: data,
  })
};


