/* eslint-disable */
import axios from '../axios';
/*
 * 系统登录模块
 */
export function login(data) {
  return axios({
    url: 'user/login',
    method: 'post',
    params: data,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
  })
}

export function register(data) {
  return axios({
    url: 'user/register',
    method: 'post',
    params: data,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
  })
}

export function getInfo() {
  return axios({
    url: 'user/getInfo',
    method: 'post',
  })
}

export function logout() {
  return axios({
    url: 'user/logout',
    method: 'post'
  })
}

export function updateProfile(data) {
  return axios({
    url: 'user/updateProfile',
    method: 'post',
    params: data,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
  })
}

export function resetPwd(data) {
  return axios({
    url: 'user/resetPwd',
    method: 'post',
    params: data,
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
  })
}

export function exchangeCode(data) {
  return axios({
    url: 'user/exchangeCode',
    method: 'post',
    params: data,
  })
}

export function getRechargePkgList(data) {
  return axios({
    url: 'recharge/package/list',
    method: 'get',
    params: data,
  })
}

export function getCostList(data) {
  return axios({
    url: 'user/getCostList',
    method: 'post',
  })
}

export function getRechargeList(data) {
  return axios({
    url: 'user/getRechargeList',
    method: 'post',
  })
}

export function getUserCouponStatics() {
  return axios({
    url: 'user/getUserCouponStatics',
    method: 'post',
  })
}

export function getUserCoupon(data) {
  return axios({
    url: 'user/getUserCoupon',
    method: 'post',
    params: data,
  })
}

export function useCoupon(data) {
  return axios({
    url: 'user/useCoupon',
    method: 'post',
    params: data,
  })
}


export function getContinueSignCount(data) {
  return axios({
    url: 'user/getContinueSignCount?uid',
    method: 'post',
    params: data,
  })
}

export function sign(data) {
  return axios({
    url: 'user/sign',
    method: 'post',
    params: data,
  })
}

export function buyCartoon(data) {
  return axios({
    url: 'user/buyCartoon',
    method: 'post',
    params: data,
  })
}

export function getHistorySearch() {
  return axios({
    url: 'user/getHistorySearch',
    method: 'post'
  })
}

export function delHistorySearch(data) {
  return axios({
    url: 'user/delHistorySearch',
    method: 'post'
  })
}
