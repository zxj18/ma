/* eslint-disable */
import axios from '../axios';

export const addCartoonToFav = (data) => (
  axios({
    url: 'fav/cartoon/addCartoonToFav',
    method: 'post',
    params: data,
  })
);

export const delCartoonFromFav = (data) => (
  axios({
    url: 'fav/cartoon/delCartoonFromFav',
    method: 'post',
    params: data,
  }));


export const getFavList = (data) => (
  axios({
    url: 'fav/cartoon/list',
    method: 'post',
    params: data,
  }));
