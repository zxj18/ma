/* eslint-disable */
import axios from '../axios';

export const getMessageDetail = (data) => (
  axios({
    url: 'message/detail',
    method: 'post',
    params: data,
  })
);

export const getMessageList = (data) => (
  axios({
    url: 'message/list',
    method: 'post',
    params: data,
  })
);

export const readAll = () => (
  axios({
    url: 'message/readAll',
    method: 'post',
  })
);

export const getUnReadCount = () => (
  axios({
    url: 'message/getUnReadCount',
    method: 'post',
  })
);

