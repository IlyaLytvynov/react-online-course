import React from "react";
import styles from './Board.module.scss';
import { RouteChildrenProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { STORE_IDS } from "../../observableStores";
import { CardsStore } from "../../observableStores/Cards";

interface OwnProps extends RouteChildrenProps<any> {
  [STORE_IDS.CARDS]?: CardsStore;
}

@inject(STORE_IDS.CARDS)
@observer
export class Board extends React.Component<OwnProps> {
  componentDidMount() {
    this.props[STORE_IDS.CARDS]!.fetchCards(this.props.match!.params.id);
  }

  renderCards() {
    return this.props[STORE_IDS.CARDS]!.list.map(({ name }: any) => {
      return <div>{name}</div>;
    });
  }

  render() {
    return <div className={styles.container}>
      {this.renderCards()}
    </div>;
  }
}

