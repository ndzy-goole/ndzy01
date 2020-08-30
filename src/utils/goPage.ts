import { createBrowserHistory, createHashHistory } from 'history';

export const historyBrowser = createBrowserHistory();
export const historyHash = createHashHistory();

export function goPageG(url: string, type: number = 0) {
  if (type === 1) {
    historyBrowser.push(url);
  } else {
    historyHash.push(url);
  }
}
