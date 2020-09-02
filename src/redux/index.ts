import { combineReducers, createStore, applyMiddleware, Store } from 'redux';
import promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';

import { authInfoReducer as authInfo } from './authInfo';

import openKeys from './openKeys';
import selectedKeys from './selectKeys';
import breadcrumb from './breadcrumb';
import collapsed from './collapsed';

import { getSession } from '@_u/index';
import { HISTORY_KEY } from '@/constant';
import cacheData from './middleware/cacheData';

export interface MyStore extends Store {
  collapsed: boolean;
  breadcrumb: { path?: string; name: string }[];
  openKeys: string[];
  selectedKeys: string[];
  authInfo: { [propsName: string]: any }[];
}

const middlewares: any = [];
middlewares.push(promiseMiddleware);
middlewares.push(cacheData as any);
if (process.env.NODE_ENV === 'development') {
  //创建中间件logger
  const logger = createLogger({
    predicate: () => {
      return true;
    }
  });
  middlewares.push(logger);
}

const reducer = combineReducers({
  openKeys,
  selectedKeys,
  breadcrumb,
  collapsed,
  authInfo
});

// export function configStore() {
//   const state = getSession(HISTORY_KEY);
//   let initState = {};

//   if (state) {
//     initState = state[0].state;
//   }
//   //  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
//   const store = createStore(
//     reducer,
//     initState,
//     applyMiddleware(...middlewares)
//   );

//   return store;
// }

//#region 初始化 store
const state = getSession(HISTORY_KEY);
let initState = {};

if (state) {
  initState = state[0].state;
}
//  window.STATE_FROM_SERVER 可以有第二个参数,表示 State 的最初状态。这通常是服务器给出的。
export const store = createStore(
  reducer,
  initState,
  applyMiddleware(...middlewares)
);
//#endregion

//#region action
export { setAuthInfo, clearAuthInfoStore } from './authInfo/authInfo.redux';
export {
  changeBreadcrumb,
  resetBreadcrumb,
  clearBreadcrumbStore
} from './breadcrumb/breadcrumb.redux';
export {
  changeCollapsed,
  clearCollapsedStore
} from './collapsed/collapsed.redux';
export { setOpenKeys, clearOpenKeysStore } from './openKeys/openKeys.redux';
export {
  setSelectKeys,
  clearSelectKeysStore
} from './selectKeys/selectKeys.redux';
//#endregion
