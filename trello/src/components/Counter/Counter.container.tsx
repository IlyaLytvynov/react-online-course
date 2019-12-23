import { Counter } from "./Counter";
import * as React from "react";
import { observer, inject } from 'mobx-react';

@inject('myCoolStore')
@observer
class CounterContainer extends React.PureComponent<any> {
  render() {
    const value = this.props.myCoolStore.value;
    return <Counter value={value} />;
  }
}

export { CounterContainer };