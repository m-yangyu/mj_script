import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import Styles from './index.module.less';


const Test = (props) => {
  const t = () => {
    console.log(props);
  };

  return (
    <div className={Styles.ss}>
      我是另一个组件
      <Button type="primary" onClick={t}>测试1</Button>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
  }),
)(Test);
