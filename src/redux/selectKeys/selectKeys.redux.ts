import { createActions, handleActions } from 'redux-actions';
import { SET_SELECT_KEYS, CLEAR_STORE } from '../actionTypes';

const selectKeys: string[] = [];

const selectKeysAction = createActions({
  [SET_SELECT_KEYS]: (selectKeys: string[]) => {
    return selectKeys;
  },
  [CLEAR_STORE]: () => {
    return [];
  }
});
// console.log(selectKeysAction);
export const setSelectKeys = selectKeysAction.setSelectKeys;
export const clearSelectKeysStore = selectKeysAction.clearStore;

const selectKeysReducer = handleActions(
  {
    [SET_SELECT_KEYS]: (state: string[], action) => {
      return action.payload.length > 0 ? [...action.payload] : [];
    },
    [CLEAR_STORE]: (state: string[], action) => {
      return action.payload;
    }
  },
  selectKeys
);

export default selectKeysReducer;
