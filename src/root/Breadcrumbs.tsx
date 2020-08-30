import React from 'react';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { RouteChildrenProps } from 'react-router-dom';
import { setSelectKeys, setOpenKeys } from '@/redux';
import { ActionFunctionAny } from 'redux-actions';
import { Action } from 'redux';

// utils
import { getOpenKeysG } from '@_u/index';

interface Props extends RouteChildrenProps {
  breadcrumb: any[];
  selectedKeys: string[];
  collapsed: boolean;
  setOpenKeys?: ActionFunctionAny<Action<any>>;
  setSelectKeys?: ActionFunctionAny<Action<any>>;
}

export default connect((state) => state, { setOpenKeys, setSelectKeys })(
  (props: Props) => {
    const handleClick = (path: string) => {
      if (path) {
        props.history.push(path);
        props.setSelectKeys && props.setSelectKeys([path]);

        // 侧边栏收缩时不设置openKey
        if (!props.collapsed) {
          props.setOpenKeys && props.setOpenKeys(getOpenKeysG(path));
        }
      }
    };

    return (
      <div className="px-4">
        <Breadcrumb>
          {props.breadcrumb.map((item, index) => {
            return (
              <Breadcrumb.Item key={index}>
                <span
                  className={item.path ? 'text-blue-600' : ''}
                  onClick={() => {
                    handleClick(item.path);
                  }}
                >
                  {item.name}
                </span>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      </div>
    );
  }
);
