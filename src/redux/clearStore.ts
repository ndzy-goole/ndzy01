import {
  store,
  clearAuthInfoStore,
  clearBreadcrumbStore,
  changeCollapsed,
  clearOpenKeysStore,
  clearSelectKeysStore
} from './index';
import { HISTORY_KEY } from '@/constant';
import { removStorage } from '@_u/index';

export function clearStore() {
  store.dispatch(clearAuthInfoStore());
  store.dispatch(clearBreadcrumbStore());
  store.dispatch(changeCollapsed());
  store.dispatch(clearOpenKeysStore());
  store.dispatch(clearSelectKeysStore());
  removStorage(HISTORY_KEY);
}
