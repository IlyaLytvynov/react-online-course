import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { increaseCount, decreaseCount, AppState, getCount } from '../../store';
interface DashboardProps extends RouteChildrenProps {
  hello?: string;
  token?: string;
  myCount?: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

class Dashboard extends React.Component<DashboardProps> {

  goBack = () => {
    this.props.history.goBack();
  };

  increase = () => {
    this.props.onIncrease && this.props.onIncrease();
  };

  decrease = () => {
    this.props.onDecrease && this.props.onDecrease();
  };

  render() {
    return <div>
      <h2 onClick={this.goBack}>Hello from dashboard</h2>
      <div>{this.props.myCount}</div>
      <button onClick={this.decrease}>-</button>
      <button onClick={this.increase}>+</button>
    </div>;
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    myCount: getCount(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount()),
    onDecrease: () => dispatch(decreaseCount())
  };
};

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export { ConnectedDashboard as Dashboard };