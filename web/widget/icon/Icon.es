import React from 'react';

export default class Icon extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      display: this.props.display
    }
  }

  render() {
    return (
      <i className={'icon-' + this.props.type} style={this.state.display ? {} : {'display': 'none'}}></i>
    );
  }
}
