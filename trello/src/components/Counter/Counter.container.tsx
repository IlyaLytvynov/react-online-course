import { Counter } from "./Counter";
import * as React from "react";
import { observer, inject } from 'mobx-react';
import { STORE_IDS } from "../../observableStores";

@inject(STORE_IDS.COOL_STORE)
@observer
class CounterContainer extends React.PureComponent<any> {
  render() {
    const value = this.props[STORE_IDS.COOL_STORE].value;
    return <Counter value={value} />;
  }
}

export { CounterContainer };