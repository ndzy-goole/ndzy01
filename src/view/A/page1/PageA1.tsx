import React, { Component } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './PageA1.scss';
// import EditableTable from '../.././../component/antd/table/editAbleRow/editAbleRow01';

interface Props extends RouteChildrenProps {
  setBreadcrumb: (data: { path?: string; name: string }[] | string) => void;
  setAuthInfo: (authInfo: any) => void;
  clearStore: () => void;
}
interface State {
  [propName: string]: any;
}

// 页面1
export default class PageA1 extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setBreadcrumb();
  }
  static getDerivedStateFromProps(props: Props, state: State) {
    return null;
  }

  render() {
    return (
      <div className="ModuleAPage1">
        {/* <EditableTable /> */}
        <h1
          onClick={() => {
            this.setState({ a: '1' });
          }}
        >
          页面1
        </h1>
      </div>
    );
  }

  // 设置面包屑参数
  setBreadcrumb() {
    // breadcrumb形式设置格式
    // let arr = [
    //   { name: '面包屑名称1' },
    //   { path: '/a/a', name: '面包屑名称2' }
    // ];
    // this.props.setBreadcrumb(arr);
    // tab形式设置格式
    // this.props.setBreadcrumb('/moduleA/page3?a=1&b=2');
  }
}
