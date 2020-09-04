import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './PageA5.scss';
import { Collapse1 } from '@_c/antd/collapse';
import { useMount } from 'ahooks';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuthInfo: (authInfo: any) => void;
  clearStore: () => void;
}

export default (props: Props) => {
  useMount(() => {});
  return (
    <div className="ModuleAPage5">
      <h1>页面5</h1>
      <Collapse1 text={'111111111111111csavdsjv kn'} />
    </div>
  );
};
