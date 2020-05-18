/* eslint-disable */
import axios from '../axios'


export const getRecommend = () => {
    return axios({
      url: '/cartoon/recommend',
      method: 'get'
    })
}
//支付类型
export const getpayTypeList= () => {
  return axios({
    url: '/payType/list',
    method: 'get',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
  })
}

export const freeOrSpecialPrice = () => {
  return axios({
    url: '/cartoon/freeOrSpecialPrice',
    method: 'get'
  })
}

export const cartoonRank = () => {
  return axios({
    url: '/cartoon/rank',
    method: 'get'
  })
}

export const cartoonPursue = () => {
  return axios({
    url: '/cartoon/pursue',
    method: 'get'
  })
}
//获得漫画
export const getCartoon = (data) => {
  return axios({
    url: '/cartoon/getCartoon',
    method: 'get',
    params: data
  })
}
//漫画获取分类列表
export const getCateList = () => {
  return axios({
    url: '/cartoon/cate/list',
    method: 'get',
  })
}

//漫画获取详情
export const getCartoonDetail = (data) => {
  return axios({
    url: '/cartoon/detail',
    method: 'post',
    params: data,
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
  })
}

//漫画目录
export const getCartoonContentsList = (data) => {
  return axios({
    url: '/cartoon/contents/list',
    method: 'post',
    params: data,
  })
}


//漫画详情列表
export const getCartoonContentsDetailList = (data) => {
  return axios({
    url: '/cartoon/contents/detail',
    method: 'post',
    params: data,
  })
}

//漫画大家都在搜锁
export const peopleSearch = (data) => {
  return axios({
    url: '/cartoon/peopleSearch',
    method: 'get',
    params: data,
  })
}
//漫画大家都在搜锁
export const search = (data) => {
  return axios({
    url: '/cartoon/search',
    method: 'get',
    params: data,
  })
}


