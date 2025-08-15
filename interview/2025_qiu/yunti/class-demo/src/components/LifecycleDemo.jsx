import React, { Component } from 'react';

class LifecycleDemo extends Component {
  constructor(props) {
    super(props);
    console.log('1. constructor');

    // 初始化 state
    this.state = {
      count: 0,
      hasError: false,
      errorMessage: '',
    };
  }

  // 组件已挂载（常用）
  componentDidMount() {
    console.log('3. componentDidMount');
    // 适合发起网络请求、设置定时器、订阅事件等
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  // 是否需要更新（性能优化用）
  shouldComponentUpdate(nextProps, nextState) {
    console.log('4. shouldComponentUpdate');
    // 只有 count 变化时才更新
    return nextState.count !== this.state.count;
  }

  // 组件已更新
  componentDidUpdate(prevProps, prevState) {
    console.log('6. componentDidUpdate');
    if (prevState.count !== this.state.count) {
      console.log(`Count updated from ${prevState.count} to ${this.state.count}`);
    }

    // 清理旧定时器（示例，实际不需要这样）
    if (this.state.count >= 10) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }


  // render 是必须的
  render() {
    console.log('render');

    return (
      <div>
        <h1>Lifecycle Demo</h1>
        <p>Count: {this.state.count}</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          Increment
        </button>
      </div>
    );
  }

  // 组件将要卸载（清理工作）
  componentWillUnmount() {
    console.log('10. componentWillUnmount');
    // 清理定时器、取消订阅、清理事件监听等
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}

export default LifecycleDemo;