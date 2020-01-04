import React from 'react';
import styles from './Board.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES_URLS } from '../App/routes';

export const Board = ({ name, id }: any) => {
  return <Link to={`${ROUTES_URLS.DASHBOARD}/${id}`}>
    <div className={styles.container}>
      {name}
    </div>
  </Link>;
};