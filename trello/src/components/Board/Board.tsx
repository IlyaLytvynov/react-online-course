import React from "react";
import styles from './Board.module.scss';
import { RouteChildrenProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { STORE_IDS } from "../../observableStores";
import { CardsStore } from "../../observableStores/Cards";
import { ListsStore } from "../../observableStores/Lists";

interface OwnProps extends RouteChildrenProps<any> {
  [STORE_IDS.CARDS]?: CardsStore;
  [STORE_IDS.LISTS]?: ListsStore;
}

@inject(STORE_IDS.CARDS)
@inject(STORE_IDS.LISTS)
@observer
export class Board extends React.Component<OwnProps> {
  componentDidMount() {
    this.props[STORE_IDS.LISTS]!.fetchLists(this.props.match!.params.id);
    this.props[STORE_IDS.CARDS]!.fetchCards(this.props.match!.params.id);
  }

  renderLists() {
    const components = [];
    const lists = this.props[STORE_IDS.LISTS]!.entities;
    for (let [_, list] of lists) {
      console.log(list);
      components.push(<li key={list.id}>{list.name}</li>);
    }
    return <ul className={styles.list}>{components}</ul>;
  }

  render() {
    return <div className={styles.container}>
      {this.renderLists()}
    </div>;
  }
}

