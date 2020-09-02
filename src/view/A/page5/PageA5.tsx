import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './PageA5.scss';
import { test } from '@/utils/root';
import { useMount } from 'ahooks';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuthInfo: (authInfo: any) => void;
  clearStore: () => void;
}

export default (props: Props) => {
  useMount(() => {
    console.log('test----------------------------');
    test({ path: '/A/page3', name: '页面111' });
  });
  return (
    <div className="ModuleAPage5">
      <h1>页面5</h1>
    </div>
  );
};
