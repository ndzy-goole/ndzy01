import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { isArray } from 'underscore';
import Frame from './Frame';
import { historyBrowser, historyHash, hasAuth } from '@_u/index';
import { menuRouter, fullScreenRouter, errRouter } from './router';
import {
  setAuthInfo,
  changeBreadcrumb,
  resetBreadcrumb,
  setOpenKeys,
  setSelectKeys,
  MyStore
} from '@/redux';

import { clearStore } from '@/redux/clearStore';

import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';

const history = {
  browser: historyBrowser,
  hash: historyHash
};

export interface RootProps {
  logo: (collapsed: boolean) => JSX.Element;
  headerHeight: number;
  headerComponent: JSX.Element | null;
  navType: 'tab' | 'breadcrumb';
  maxTabNum: number;
  historyType: 'browser' | 'hash';
  authInfo: any[];
  collapsed: boolean;
  breadcrumb: any[];
  setAuthInfo?: ActionFunctionAny<Action<any>>;
  resetBreadcrumb?: ActionFunctionAny<Action<any>>;
  changeBreadcrumb?: ActionFunctionAny<Action<any>>;
  setSelectKeys?: ActionFunctionAny<Action<any>>;
  setOpenKeys?: ActionFunctionAny<Action<any>>;
}

const mapStateToProps = (store: MyStore) => {
  const { authInfo, collapsed, breadcrumb } = store;
  return {
    authInfo,
    collapsed,
    breadcrumb
  };
};

export const Root = connect(mapStateToProps, {
  resetBreadcrumb,
  setAuthInfo,
  changeBreadcrumb,
  setSelectKeys,
  setOpenKeys
})((props: RootProps) => {
  /**
   * @description 设置面包屑
   * @param data
   */
  const handleSetBreadcrumb = (
    data: { path?: string; name: string }[] | string
  ) => {
    if (isArray(data)) {
      props.resetBreadcrumb && props.resetBreadcrumb(data);
      return;
    }

    const pathInfo = props.breadcrumb.find((item) => {
      return item.path === data;
    });

    // tab形式的面包屑需要同步设置selectKeys
    let openKey = '';

    menuRouter.forEach((item) => {
      if (data.split('?')[0] === item.path) {
        if (!pathInfo) {
          props.changeBreadcrumb &&
            props.changeBreadcrumb({ path: data, name: item.title });
        }
        props.setSelectKeys && props.setSelectKeys([data]);
      } else if (data.includes(item.parent)) {
        openKey = item.parent;
      }
    });

    if (!props.collapsed) {
      props.setOpenKeys && props.setOpenKeys([openKey]);
    }
  };
  return (
    <Router history={history[props.historyType]}>
      <Switch>
        {/* 导航菜单下的子模块 */}
        {menuRouter.map((item) => {
          // 路由权限
          if (!hasAuth(item.auth, props.authInfo)) {
            return null;
          }
          return (
            <Route
              exact
              key={item.path}
              path={item.path}
              render={(routeProps) => {
                const Page = item.component; //页面

                return (
                  <Frame {...props} {...routeProps}>
                    <Page
                      {...routeProps}
                      clearStore={() => {
                        clearStore();
                      }}
                      setBreadcrumb={(data: any) => {
                        handleSetBreadcrumb(data);
                      }}
                      setAuthInfo={(authInfo: any) => {
                        props.setAuthInfo && props.setAuthInfo(authInfo);
                      }}
                    />
                  </Frame>
                );
              }}
            />
          );
        })}

        {/* 全局模块 */}
        {fullScreenRouter.map((item) => {
          return (
            <Route
              exact
              key={item.path}
              path={item.path}
              render={(routeProps) => {
                const Page = item.component;

                return (
                  <Page
                    {...routeProps}
                    clearStore={() => {
                      clearStore();
                    }}
                    setBreadcrumb={(data: any) => {
                      handleSetBreadcrumb(data);
                    }}
                    setAuthInfo={(authInfo: any) => {
                      props.setAuthInfo && props.setAuthInfo(authInfo);
                    }}
                  />
                );
              }}
            />
          );
        })}

        <Redirect exact path="/" to={{ pathname: '/login' }} />

        <Route
          render={(routeProps) => {
            let Error = errRouter[0].component;

            return (
              <Error
                {...routeProps}
                clearStore={() => {
                  clearStore();
                }}
                setBreadcrumb={(data: any) => {
                  handleSetBreadcrumb(data);
                }}
                setAuthInfo={(authInfo: any) => {
                  props.setAuthInfo && props.setAuthInfo(authInfo);
                }}
              />
            );
          }}
        />
      </Switch>
    </Router>
  );
});
