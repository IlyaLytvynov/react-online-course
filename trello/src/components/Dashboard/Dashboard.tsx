import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { STORE_IDS } from '../../observableStores';
import { BoardsStore } from '../../observableStores/Boards';
import styles from './Dashboard.module.scss';
import { Board } from './Board';

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
      return <Board name={item.name} id={item.id} />;
    });
  }

  render() {
    return <div className={styles.container}>
      {this.renderBoards()}
    </div>;
  }
}


export { Dashboard };