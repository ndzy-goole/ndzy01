import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Button } from 'antd';
import { useMount } from 'ahooks';
import { connect, DispatchProp } from 'react-redux';

interface Props extends RouteChildrenProps, DispatchProp {
  // 设置面包屑 有两种形式
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuthInfo: (authInfo: any) => void;
  clearStore: () => void;
}

const Login = (props: Props) => {
  console.log(props);
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

export default connect()(Login);
