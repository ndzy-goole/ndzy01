import {
  configStore,
  clearAuthInfoStore,
  clearBreadcrumbStore,
  clearCollapsedStore,
  clearOpenKeysStore,
  clearSelectKeysStore
} from './index';
import { HISTORY_KEY } from '@/constant';
import { removStorage } from '@_u/index';

export function clearStore() {
  configStore().dispatch(clearAuthInfoStore());
  configStore().dispatch(clearBreadcrumbStore());
  configStore().dispatch(clearCollapsedStore());
  configStore().dispatch(clearOpenKeysStore());
  configStore().dispatch(clearSelectKeysStore());
  removStorage(HISTORY_KEY);
}
