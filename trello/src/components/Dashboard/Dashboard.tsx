import * as React from 'react';
import { RouteChildrenProps } from 'react-router';

interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
}

export class Dashboard extends React.Component<DashboardProps> {

  goBack = () => {
    this.props.history.goBack();
  }

  render() {
    console.log(this.props);
    return <h2 onClick={this.goBack}>Hello from dashboard</h2>
  }
}