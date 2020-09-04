import { createActions, handleActions } from 'redux-actions';
import { SET_AUTH, CLEAR_AUTH_INFO_STORE } from '../actionTypes';
import { AnyObj } from '@/types';

const authInfo: AnyObj[] = [];

const actions = createActions({
  [SET_AUTH]: (authInfo: AnyObj[]) => {
    return authInfo;
  },
  [CLEAR_AUTH_INFO_STORE]: () => {
    return [];
  }
});
console.log(actions);
export const setAuth = actions.setAuth;
export const clearAuthInfoStore = actions.clearAuthInfoStore;

export const authInfoReducer = handleActions(
  {
    [SET_AUTH]: (state: AnyObj[], action) => {
      console.log(state, action);
      return action.payload;
    },
    [CLEAR_AUTH_INFO_STORE]: (state: AnyObj[], action) => action.payload
  },
  authInfo
);
