import React, { Component } from 'react';
import { InfoBox } from './InfoBox';
import { TestComp } from './TestComp';
import './App.css';

class App extends Component {
  render() {
    const appStyles = { backgroundColor: 'red' };

    return (
      <div style={appStyles}>
        <InfoBox />
        <TestComp />
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate id
          odio numquam repudiandae ex fuga illum nobis nemo provident neque
          fugiat, ipsam repellat aliquid vitae animi minima molestiae eaque
          veritatis!
        </p>
      </div>
    );
  }
}

export { App };
