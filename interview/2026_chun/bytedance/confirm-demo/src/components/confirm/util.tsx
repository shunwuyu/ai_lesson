import React from 'react';
import Confirm, { ConfirmOptions } from './index';

// 全局创建 confirm 方法
export function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const destroy = () => {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    };

    const render = (visible: boolean) => {
      ReactDOM.render(
        <Confirm
          {...options}
          visible={visible}
          onConfirm={() => {
            resolve(true);
            render(false);
            setTimeout(destroy, 300);
          }}
          onCancel={() => {
            resolve(false);
            render(false);
            setTimeout(destroy, 300);
          }}
        />,
        div
      );
    };

    render(true);
  });
}