import { createActions, handleActions } from 'redux-actions';
import {
  CHANGE_BREADCRUMB,
  RESET_BREADCRUMB,
  CLEAR_BREADCRUMB_STORE
} from '../actionTypes';

interface BreadcrumbStore {
  path?: string;
  name: string;
}

const breadcrumb: BreadcrumbStore[] = [];

const breadcrumbAction = createActions({
  [CHANGE_BREADCRUMB]: (breadcrums: BreadcrumbStore[]) => {
    return breadcrums;
  },
  [RESET_BREADCRUMB]: (breadcrums: BreadcrumbStore[]) => {
    return breadcrums;
  },
  [CLEAR_BREADCRUMB_STORE]: () => {
    return [];
  }
});
// console.log(breadcrumbAction)
export const changeBreadcrumb = breadcrumbAction.changeBreadcrumb;
export const resetBreadcrumb = breadcrumbAction.resetBreadcrumb;
export const clearBreadcrumbStore = breadcrumbAction.clearBreadcrumbStore;

const breadcrumbReducer = handleActions(
  {
    [CHANGE_BREADCRUMB]: (state: BreadcrumbStore[], action: any) => [
      ...state,
      action.payload
    ],
    [RESET_BREADCRUMB]: (state: BreadcrumbStore[], action) => action.payload,
    [CLEAR_BREADCRUMB_STORE]: (state: BreadcrumbStore[], action) =>
      action.payload
  },
  breadcrumb
);

export default breadcrumbReducer;
