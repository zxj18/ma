/* eslint-disable */
import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '../router/index.js'
import {getAdult, getToken} from '../utils/auth'
import { baseUrl} from "../utils/global";
import {removeToken} from "../utils/auth";

// 使用vuex做全局loading时使用
// import store from '@/store'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = getToken();
        let isAdult = getAdult();
        // token = '32bafeba5bab24db98c85862f56d60b04';
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers.token = token
        }
        if (isAdult) {
          config.headers.isAdult = isAdult
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {

        }

        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        console.log('request:', response.config.url);
        console.log('response:', data);
        if (data.code !== 200){
          // 根据返回的code值来做不同的处理
          switch (data.code) {
            case 1:
              console.log(data.desc)
              break;
            case 401:
              removeToken();
              localStorage.clear();
              if (response.config.url.indexOf('sign/list') !== -1
                ||response.config.url.indexOf('user/getInfo') !== -1
                ||response.config.url.indexOf('fav/cartoon/list') !== -1
                ||response.config.url.indexOf('history/cartoon/list') !== -1
                ||response.config.url.indexOf('user/getHistorySearch') !== -1
                ||response.config.url.indexOf('user/saveHistorySearch') !== -1
                ||response.config.url.indexOf('message/getUnReadCount') !== -1
                ||response.config.url.indexOf('cartoon/detail') !== -1
                ||response.config.url.indexOf('cartoon/contents/list') !== -1
                ){
                console.log('401,但不跳转登录界面');
              } else {
                router.push({
                  path: '/login',
                })
              }

              break;
          }
          // window.alert(data.message)
        }
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        console.error(err)
          // window.alert(err)
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
