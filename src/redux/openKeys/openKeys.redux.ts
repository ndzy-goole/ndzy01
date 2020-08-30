import { createActions, handleActions } from 'redux-actions';
import { SET_OPEN_KEYS, CLEAR_OPEN_KEYS_STORE } from '../actionTypes';

const openKeys: string[] = [];
const openKeysAction = createActions({
  [SET_OPEN_KEYS]: (openKeys: string[]) => {
    return openKeys;
  },
  [CLEAR_OPEN_KEYS_STORE]: () => {
    return [];
  }
});

// console.log(openKeysAction);
export const setOpenKeys = openKeysAction.setOpenKeys;
export const clearOpenKeysStore = openKeysAction.clearOpenKeysStore;

const openKeysReducer = handleActions(
  {
    [SET_OPEN_KEYS]: (state: string[], action) => {
      return action.payload.length > 0 ? [...action.payload] : [];
    },
    [CLEAR_OPEN_KEYS_STORE]: (state: string[], action) => {
      return action.payload;
    }
  },
  openKeys
);

export default openKeysReducer;
