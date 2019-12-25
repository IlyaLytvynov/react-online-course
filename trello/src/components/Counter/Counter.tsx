import React, { PureComponent } from "react";
import { MyCoolStore } from "../../observableStores/MyCoolStore";


interface Props {
  value?: MyCoolStore;
}

export class Counter extends PureComponent<Props> {
  render() {
    return <h2>{this.props.value}</h2>;
  }
}