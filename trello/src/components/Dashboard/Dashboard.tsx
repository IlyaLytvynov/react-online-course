import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { connect } from 'react-redux';
import { increaseCount, decreaseCount, AppState, getCount } from '../../store';
import {
  fetchBoards,
  getBoards,
  editBoardName,
  addBoard,
} from '../../store/boards';
import { BoardPreview, BoardPreviewAdd } from '../BoardPreview';
import styles from './Dashboard.module.scss';
import { IBoard } from '../../types';
interface DashboardProps extends RouteChildrenProps {
  token?: string;
  boards: Array<IBoard>;
  onIncrease: () => void;
  onDecrease: () => void;
  onFetchBoards: () => void;
  onEditBoard: (id: string, name: string) => void;
  onAddBoard: (name: string) => void;
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

  componentDidMount() {
    this.props.onFetchBoards!();
  }

  onSubmitEditing = (name: string, id?: string) => {
    console.log(id, name);
    this.props.onEditBoard(id as string, name);
  };

  onAddBoard = (name: string) => {
    this.props.onAddBoard(name);
  };

  render() {
    const { boards } = this.props;
    return (
      <div>
        <div className={styles.container}>
          {boards.map(({ name, id }) => (
            <BoardPreview
              key={id}
              name={name}
              id={id}
              onSubmitEditing={this.onSubmitEditing}
            />
          ))}
          <BoardPreviewAdd onSubmitEditing={this.onAddBoard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    boards: getBoards(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount()),
    onDecrease: () => dispatch(decreaseCount()),
    onFetchBoards: () => dispatch(fetchBoards()),
    onEditBoard: (id: string, name: string) =>
      dispatch(editBoardName(id, name)),
    onAddBoard: (name: string) => dispatch(addBoard(name)),
  };
};

const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export { ConnectedDashboard as Dashboard };
