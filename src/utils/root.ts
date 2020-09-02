import { menuRouter } from '@/root';
import { changeBreadcrumb, store } from '@/redux';
/**
 * @description 获取打开的菜单
 * @param path
 */
export function getOpenKeysG(path: string) {
  if (!path) {
    return [];
  }
  let openKey = '';

  menuRouter.forEach((item) => {
    if (item.path === path.split('?')[0]) {
      openKey = item.parent;
    }
  });

  return [openKey];
}

export function test(test: any) {
  store.dispatch(changeBreadcrumb(test));
}
