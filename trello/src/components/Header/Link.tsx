import React, { FunctionComponent } from "react";
import { Link as RouteLink } from 'react-router-dom';
import styles from './Link.module.scss';

interface Props {
  title?: string;
  path: string;
}

export const Link: FunctionComponent<Props> = ({ title, path }: Props) => {
  return <RouteLink to={path} className={styles.link}>
    {title}
  </RouteLink>;
};