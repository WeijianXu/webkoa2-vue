import React from 'react';
import './images/logos.png';

export default class Logo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href={this.props.logoHref} className="logo headLogo-icon">
        <span>{this.props.title}</span>
        <span>{this.props.subtitle}</span>
      </a>
    );
  }
}