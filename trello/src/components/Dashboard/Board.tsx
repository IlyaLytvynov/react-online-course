import React from 'react';
import styles from './Board.module.scss';
import { Link } from 'react-router-dom';
import { ROUTES_URLS } from '../App/routes';

export const Board = ({ name, id, prefs }: any) => {
  const inlineStyles = {
    backgroundImage: prefs.backgroundImage,
    backgroundColor: prefs.backgroundColor,
  };
  return <Link to={`${ROUTES_URLS.DASHBOARD}/${id}`}  >
    <span style={inlineStyles} className={styles.container}>{name}</span>
  </Link>;
};