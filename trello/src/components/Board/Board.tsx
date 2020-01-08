import React from "react";
import styles from './Board.module.scss';
import { RouteChildrenProps } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { STORE_IDS } from "../../observableStores";
import { CardsStore } from "../../observableStores/Cards";
import { ListsStore } from "../../observableStores/Lists";
import { Loader } from '../Loader';
import { List } from "./List";
import { BoardsStore } from "../../observableStores/Boards";
import { HelloWorldContext } from '../../contexts/HelloWorldContext';
interface OwnProps extends RouteChildrenProps<any> {
  [STORE_IDS.CARDS]?: CardsStore;
  [STORE_IDS.LISTS]?: ListsStore;
  [STORE_IDS.BOARDS]?: BoardsStore;
}


const Paragraph = (props: any) => {
  return <p><b>{props.children('HELLO DUDES!!')}</b></p>;
};

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

    for (let [id, list] of lists) {
      const cards = this.props[STORE_IDS.CARDS]!.entities.get(id) || [];
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
    const boardStyle = {
      background: board.prefs.background,
      backgroundImage: board.prefs.backgroundImage,
      backgroundColor: board.prefs.backgroundColor,
      color: board.prefs.backgroundBrightness === 'dark' ? '#FFF' : undefined
    };
    return <div className={styles.container} style={boardStyle}>
      <HelloWorldContext.Consumer>
        {
          ({ title, changeTitle }: any) => <><h1>{title}</h1><input type="text" onChange={(e) => changeTitle(e.currentTarget.value)} /></>
        }
      </HelloWorldContext.Consumer>
      <Paragraph>
        {
          (someCoolValue: any) => <>
            <a href="">{someCoolValue}</a>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur minus sit nulla provident voluptas? Esse voluptates quam cum. Suscipit ea voluptate veniam architecto. Officiis ratione provident inventore mollitia, sequi nihil.
          <img src="" alt="" />
          </>
        }
      </Paragraph>
      {this.renderContent()}
    </div>;
  }
}



