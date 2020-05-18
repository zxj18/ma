/* eslint-disable import/no-unresolved */
/*
 * 接口统一集成模块
 */
import * as banner from './moudules/banner';
import * as cartoon from './moudules/cartoon';
import * as fav from './moudules/fav';
import * as history from './moudules/history';
import * as user from './moudules/user';
import * as message from './moudules/message';
import * as common from './moudules/common';
import * as order from './moudules/order';
import * as payType from './moudules/paytype';
import * as payWay from './moudules/payway';

// 默认全部导出
export default {
  banner,
  cartoon,
  fav,
  history,
  user,
  message,
  common,
  order,
  payType,
  payWay,

};
