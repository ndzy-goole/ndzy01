import { createActions, handleActions } from 'redux-actions';
import { SET_SELECT_KEYS, CLEAR_SELECT_KEYS_STORE } from '../actionTypes';

const selectKeys: string[] = [];

const selectKeysAction = createActions({
  [SET_SELECT_KEYS]: (selectKeys: string[]) => {
    return selectKeys;
  },
  [CLEAR_SELECT_KEYS_STORE]: () => {
    return [];
  }
});
// console.log(selectKeysAction);
export const setSelectKeys = selectKeysAction.setSelectKeys;
export const clearSelectKeysStore = selectKeysAction.clearSelectKeysStore;

const selectKeysReducer = handleActions(
  {
    [SET_SELECT_KEYS]: (state: string[], action) => {
      return action.payload.length > 0 ? [...action.payload] : [];
    },
    [CLEAR_SELECT_KEYS_STORE]: (state: string[], action) => {
      return action.payload;
    }
  },
  selectKeys
);

export default selectKeysReducer;
