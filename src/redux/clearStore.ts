import {
  store,
  clearAuthInfoStore,
  clearBreadcrumbStore,
  clearCollapsedStore,
  clearOpenKeysStore,
  clearSelectKeysStore
} from './index';
import { HISTORY_KEY } from '@/constant';
import { removStorage } from '@_u/index';

export function clearStore() {
  store.dispatch(clearAuthInfoStore());
  store.dispatch(clearBreadcrumbStore());
  store.dispatch(clearCollapsedStore());
  store.dispatch(clearOpenKeysStore());
  store.dispatch(clearSelectKeysStore());
  removStorage(HISTORY_KEY);
}
