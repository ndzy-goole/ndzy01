import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Button } from 'antd';
import { useMount } from 'ahooks';

interface Props extends RouteChildrenProps {
  // 设置面包屑 有两种形式
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuthInfo: (authInfo: any) => void;
  clearStore: () => void;
}

export default (props: Props) => {
  const handleLogin = () => {
    const authInfo = [{ auth: '张一', name: '页面1' }];
    const path = '/A/page1';
    props.history.push(path);
    // props.setBreadcrumb(path);
    props.setAuthInfo(authInfo);
  };
  useMount(() => {});
  return (
    <div className="h-full flex justify-center items-center">
      <Button
        type="primary"
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </Button>
    </div>
  );
};
