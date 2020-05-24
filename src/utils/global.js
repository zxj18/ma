/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

// 后台管理系统服务器地址
// 本地
// export const baseUrl = 'http://192.168.2.214:9999/api';
// export const baseUrl = 'http://localhost:9999/api';
// 本地

// 亚马逊云
// export const baseUrl = 'http://18.221.3.200:9999/api';
// 本地
// export const baseUrl = 'http://192.168.3.6:9999/api';
// 打包地址
// export const baseUrl = 'http://13.229.102.48:9999/api';
// 线上
export const baseUrl = 'http://47.52.239.38:9999/api';


export default {
  baseUrl,
};
