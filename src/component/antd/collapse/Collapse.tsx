import React from 'react';
import { Collapse, Button } from 'antd';
import { InitProps } from '@/types';
import { useSetState, useMount } from 'ahooks';
import * as _ from 'lodash';

const { Panel } = Collapse;

interface Props extends InitProps {
  text?: string;
  num?: number;
}
export const Collapse1 = ({ text, num = 10 }: Props) => {
  const [state, setState] = useSetState({
    view: <span>{'----'}</span>
  });
  useMount(() => {
    if (_.isEmpty(text)) {
      setState({
        view: <span>{'----'}</span>
      });
    } else {
      setState({
        view: (
          <Collapse bordered={false}>
            <Panel
              showArrow={false}
              header={
                <Button type="link">
                  {text && text.slice(0, num) + '...'}
                </Button>
              }
              key="1"
            >
              {text}
            </Panel>
          </Collapse>
        )
      });
    }
  });

  return state.view;
};
