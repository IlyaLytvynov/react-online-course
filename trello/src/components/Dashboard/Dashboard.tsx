import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { STORE_IDS } from '../../observableStores';
import { BoardsStore } from '../../observableStores/Boards';
import styles from './Dashboard.module.scss';
import { Board } from './Board';
import { Loader } from '../Loader';

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
    return Array.from(this.store!.entities.values()).map((item: any) => {
      return <div className={styles.item}>
        <Board {...item} />
      </div>;
    });
  }

  renderLoader() {
    return <div className={styles.loader}>
      <Loader />
    </div>;
  }

  render() {
    return <div className={styles.container}>
      <div className={styles.content}>
        {this.store!.isLoading ? this.renderLoader() : this.renderBoards()}
      </div>
    </div>;
  }
}


export { Dashboard };