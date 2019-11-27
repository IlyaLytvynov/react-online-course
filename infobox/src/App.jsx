import React, { Component } from "react";
import { InfoBox } from "./InfoBox";
import { TestComp } from "./TestComp";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <div>
        <InfoBox />
      </div>
    );
  }
}

export { App };
