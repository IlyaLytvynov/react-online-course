import React from "react";
import styles from './Board.module.scss';
import { RouteChildrenProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { STORE_IDS } from "../../observableStores";
import { CardsStore } from "../../observableStores/Cards";
import { ListsStore } from "../../observableStores/Lists";
import { Loader } from '../Loader';
import { Card } from "../../types";
import { List } from "./List";
import { BoardsStore } from "../../observableStores/Boards";

interface OwnProps extends RouteChildrenProps<any> {
  [STORE_IDS.CARDS]?: CardsStore;
  [STORE_IDS.LISTS]?: ListsStore;
  [STORE_IDS.BOARDS]?: BoardsStore;
}

@inject(STORE_IDS.CARDS)
@inject(STORE_IDS.BOARDS)
@inject(STORE_IDS.LISTS)
@observer
export class Board extends React.Component<OwnProps> {
  componentDidMount() {
    this.props[STORE_IDS.LISTS]!.fetchLists(this.props.match!.params.id);
    this.props[STORE_IDS.CARDS]!.fetchCards(this.props.match!.params.id);
    if (!this.props[STORE_IDS.BOARDS]!.getBoard(this.props.match!.params.id)) {
      this.props[STORE_IDS.BOARDS]!.fetchBoard(this.props.match!.params.id);
    }
  }

  renderLists() {
    const lists = this.props[STORE_IDS.LISTS]!.entities;
    const el = [];
    console.log('TEST');
    for (let [id, list] of lists) {
      const cards = this.props[STORE_IDS.CARDS]!.entities.get(id) || [];
      console.log(list);
      el.push(<div className={styles.list}><List {...list} cards={cards} /></div>);
    }
    return el;
  }

  renderLoader() {
    return <div className={styles.centeredContainer}>
      <Loader />
    </div>;
  }

  renderContent() {
    return this.props[STORE_IDS.LISTS]!.isLoading || this.props[STORE_IDS.CARDS]!.isLoading ? this.renderLoader() : this.renderLists();
  }

  render() {
    const board = this.props[STORE_IDS.BOARDS]!.getBoard(this.props.match!.params.id);
    if (!board) {
      return this.renderLoader();
    }
    console.log(board);
    const boardStyle = {
      background: board.prefs.background,
      backgroundImage: board.prefs.backgroundImage,
      backgroundColor: board.prefs.backgroundColor,
      color: board.prefs.backgroundBrightness === 'dark' ? '#FFF' : undefined
    };
    return <div className={styles.container} style={boardStyle}>
      {this.renderContent()}
    </div>;
  }
}

