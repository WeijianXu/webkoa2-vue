import React from 'react';
import Counter from './Counter.es';

export default class Header extends React.Component {
  
  render() {
    return (
      <div className="newheader">
        <Counter />
      </div>
    );
  }
};
