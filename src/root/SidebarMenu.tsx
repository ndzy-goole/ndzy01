import React from 'react';
import {
  Menu
  // Icon
} from 'antd';
import './styles/SidebarMenu.scss';
import { RouteChildrenProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { setOpenKeys, setSelectKeys, changeBreadcrumb, MyStore } from '@/redux';

import { appConfig, menuRouter } from './router';
import { hasAuth } from '@_u/index';

import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';

interface Props extends RouteChildrenProps {
  collapsed: boolean;
  breadcrumb: any[];
  openKeys: string[];
  selectedKeys: string[];
  authInfo: {}[];
  setOpenKeys?: ActionFunctionAny<Action<any>>;
  setSelectKeys?: ActionFunctionAny<Action<any>>;
  changeBreadcrumb?: ActionFunctionAny<Action<any>>;
}

const mapStateToProps = (store: MyStore) => {
  const { collapsed, breadcrumb, openKeys, selectedKeys, authInfo } = store;

  return {
    collapsed,
    breadcrumb,
    openKeys,
    selectedKeys,
    authInfo
  };
};

export default connect(mapStateToProps, {
  setOpenKeys,
  setSelectKeys,
  changeBreadcrumb
})((props: Props) => {
  const selectedKeys = props.selectedKeys.map((key) => {
    return key.split('?')[0];
  });

  const handleOpen = (openKeys: string[]) => {
    // 去重
    props.setOpenKeys && props.setOpenKeys(Array.from(new Set(openKeys)));
  };

  const setBreadcrumb = (key: string) => {
    const pathInfo = props.breadcrumb.find((item) => {
      return item.path === key;
    });

    // 防止重复设置
    if (pathInfo) {
      return;
    }

    menuRouter.forEach((item) => {
      if (key.includes(item.path)) {
        props.changeBreadcrumb &&
          props.changeBreadcrumb({ path: key, name: item.title });
      }
    });
  };

  const handleMenu = (params: { key: string; selectedKeys: string[] }) => {
    props.history.push(params.key);
    props.setSelectKeys && props.setSelectKeys(params.selectedKeys);
    setBreadcrumb(params.key);
  };

  // 渲染导航列表
  const renderMenu = (menu: any[]): (JSX.Element | null)[] => {
    let router = menu.map((item) => {
      // 配置隐藏的页面不在侧边栏显示
      if (item.hidden || !hasAuth(item.auth, props.authInfo)) {
        return null;
      }

      if (item.subMenu) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={
              <span>
                {/* TODO: 图标 */}
                {/* {item.icon && item.icon.includes('icon-') ? (
                  <i className={`menu-iconfont iconfont ${item.icon}`} />
                ) : item.icon ? (
                  <Icon type={item.icon} />
                ) : null} */}
                <span>{item.title}</span>
              </span>
            }
          >
            {renderMenu(item.subMenu)}
          </Menu.SubMenu>
        );
      }

      return (
        <Menu.Item key={item.key}>
          {/* TODO: 图标 */}

          {/* {item.icon && item.icon.includes('icon-') ? (
            <i className={`menu-iconfont iconfont ${item.icon}`} />
          ) : item.icon ? (
            <Icon type={item.icon} />
          ) : null} */}
          <span>{item.title}</span>
        </Menu.Item>
      );
    });

    return router;
  };
  return (
    <Menu
      className="layout-sidebar-menu"
      style={{ minHeight: '100%', width: '100%' }}
      mode="inline"
      theme="light"
      inlineCollapsed={props.collapsed}
      defaultOpenKeys={props.openKeys}
      defaultSelectedKeys={selectedKeys}
      openKeys={props.openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={(keys: any) => {
        handleOpen(keys);
      }}
      onSelect={(info: any) => {
        handleMenu(info);
      }}
    >
      {renderMenu(appConfig.menu)}
    </Menu>
  );
});
