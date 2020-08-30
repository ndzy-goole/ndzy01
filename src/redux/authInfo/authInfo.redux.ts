import { createActions, handleActions } from 'redux-actions';
import { SET_AUTH_INFO, CLEAR_AUTH_INFO_STORE } from '../actionTypes';
import { AnyObj } from '@/types';

const authInfo: AnyObj[] = [];

const authInfoAction = createActions({
  [SET_AUTH_INFO]: (authInfo: AnyObj[]) => {
    return authInfo;
  },
  [CLEAR_AUTH_INFO_STORE]: () => {
    return [];
  }
});
// console.log(authInfoAction);
export const setAuthInfo = authInfoAction.setAuthInfo;
export const clearAuthInfoStore = authInfoAction.clearAuthInfoStore;

export const authInfoReducer = handleActions(
  {
    [SET_AUTH_INFO]: (state: AnyObj[], action) => {
      console.log(state, action);
      return action.payload;
    },
    [CLEAR_AUTH_INFO_STORE]: (state: AnyObj[], action) => action.payload
  },
  authInfo
);
