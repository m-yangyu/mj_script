import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import IMG from '@/assets/test.png';
import Styles from './index.module.scss';

const Test = (props) => {
  const t = () => {
    console.log(props);
  };

  return (
    <div className={Styles.ss}>
      我是一个组件
      <img src={IMG} alt="test" />
      <img src="/assets/test.png" alt="test" />
      <div className={Styles.img} />
      <Button type="primary" onClick={t}>测试111</Button>
    </div>
  );
};

export default connect(
  (state) => ({
    state,
  }),
)(Test);
