import React from "react";
import { CardsCollection, Card } from '../../types';
import styles from './List.module.scss';

interface Props {
  name: string;
  cards: CardsCollection;
}

export class List extends React.PureComponent<Props> {
  renderList = () => (
    this.props.cards.map(({ id, name }: Card) => <li key={id} id={id} className={styles.card}>{name}</li>)
  );

  render() {
    return <div className={styles.container}>
      <h3 className={styles.name}>{this.props.name}</h3>
      <ul className={styles.list}>
        {this.renderList()}
      </ul>
    </div>;
  }
}