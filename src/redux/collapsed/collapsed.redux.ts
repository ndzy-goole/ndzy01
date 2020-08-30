import { createActions, handleActions } from 'redux-actions';
import { CHANGE_COLLAPSED, CLEAR_COLLAPSED_STORE } from '../actionTypes';

const collapsed: boolean = false;
const collapsedAction = createActions({
  [CHANGE_COLLAPSED]: (collapsed: boolean) => {
    return collapsed;
  },
  [CLEAR_COLLAPSED_STORE]: () => {
    return false;
  }
});
// console.log(collapsedAction);
export const changeCollapsed = collapsedAction.changeCollapsed;
export const clearCollapsedStore = collapsedAction.clearCollapsedStore;

const collapsedReducer = handleActions(
  {
    [CHANGE_COLLAPSED]: (state: boolean, action) => {
      return action.payload;
    },
    [CLEAR_COLLAPSED_STORE]: (state: boolean, action) => {
      console.log(action.payload);
      return action.payload;
    }
  },
  collapsed
);

export default collapsedReducer;
