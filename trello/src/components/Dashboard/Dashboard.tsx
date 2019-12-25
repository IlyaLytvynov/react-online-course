import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { increaseCount, decreaseCount, AppState, getCount } from '../../store';
import { fetchBoards, getBoards } from '../../store/boards';
import { inject, observer } from 'mobx-react';
import { STORE_IDS } from '../../observableStores';
import { observable } from 'mobx';
import { BoardsStore } from '../../observableStores/Boards';

interface DashboardProps extends RouteChildrenProps {
  [STORE_IDS.BOARDS]?: BoardsStore;
}

@inject(STORE_IDS.BOARDS)
@observer
class Dashboard extends React.Component<DashboardProps> {

  goBack = () => {
    this.props.history.goBack();
  };

  public componentDidMount() {
    this.props[STORE_IDS.BOARDS]!.fetchBoards();
  }

  private get store() {
    return this.props[STORE_IDS.BOARDS];
  }

  renderBoards() {
    return this.store!.list.map((item: any) => {
      return <div>{item.name}</div>;
    });
  }

  render() {
    return <div>
      <h2 onClick={this.goBack}>Hello from dashboard</h2>
      {this.renderBoards()}
    </div>;
  }
}


export { Dashboard };