import React from 'react';
import Icon from '../icon/Icon.es';

export default class HeaderTools extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header-tools">
        <ul className="bar-tool">
          <li className="tool-li">
            <a href="/portal/notification/list">
              <Icon type="email"></Icon>
              <Icon type="spot" display="true"></Icon>
            </a>
          </li>
          <li className="tool-li">
            <Icon type="setting"></Icon>
          </li>
          <li className="tool-li">
            
          </li>
        </ul>
      </div>
    );
  }
}
