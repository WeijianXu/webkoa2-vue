import React from 'react';
import Counter from './Counter.es';
import Logo from './Logo.es';
import './header.less';

export default class Header extends React.Component {

  render() {
    return (
      <div className="newHeader">
        <Counter />
        <div className="topBar">
          { /*<HeaderTools />*/ }
          <Logo href="/portal/index" title="杭州智慧医疗健康网" subtitle="Hangzhou health services" />
        </div>
      </div>
    );
  }
}
