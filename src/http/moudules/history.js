/* eslint-disable */
import axios from '../axios';

export const delCartoonFromHistory = (data) => (
  axios({
    url: 'history/cartoon/delCartoonFromHistory',
    method: 'post',
    params: data,
  }));


export const getHistoryList = (data) => (
  axios({
    url: 'history/cartoon/list',
    method: 'post',
    params: data,
  }));

