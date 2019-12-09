import * as React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { Login } from "../Login";
import { Dashboard } from "../Dashboard";
import { NotFound } from '../NotFound';
import { OAuth } from '../OAuth/OAuth';

export interface AppRoute {
  path: string,
  render: (props: any) => any,
  title?: string,
  isHidden?: boolean,
  exact?: boolean
}

export const routes: Array<AppRoute> = [
  {
    path: '/login',
    render: (props: any) => <Login {...props} />,
    title: 'Login'
  },
  {
    path: '/dashboard',
    title: 'Dashboard',
    render: (props: RouteChildrenProps) => <Dashboard {...props} />,
  },
  {
    path: '/',
    isHidden: true,
    exact: true,
    render: () => <Redirect to="/login" />,
  },
  {
    path: '/404',
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
  },
]