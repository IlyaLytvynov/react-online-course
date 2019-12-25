import React, { PureComponent } from "react";
import styles from './Notifications.module.scss';

export class Notifications extends PureComponent<any> {
  render() {
    return <ul className={styles.root}>
      {this.props.list.map(({ message, id }: { message: string, id: string; }) => <li id={id}>{message}</li>)}
    </ul>;
  }
}