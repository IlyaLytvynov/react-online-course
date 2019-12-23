import * as React from 'react';
import { Route, RouteComponentProps, Redirect, Switch, RouteChildrenProps, withRouter } from 'react-router-dom';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

import styles from './App.module.scss';
import { Header } from '../Header';
import { init } from '../../store/initialization';
import { connect } from 'react-redux';

const TOKEN_STRORAGE_KEY = 'TOKEN';
const { REACT_APP_API_KEY } = process.env;

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
  userProfile: any;
}

interface AppProps { }

const INITIAL_STATE = {
  token: '',
  userProfile: undefined,
  boards: []
};

class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  private renderContent() {
    return <main className={styles.content}>
      <Switch>
        {routes.map(this.renderRoute)}
        <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OAuth {...props} />} />
      </Switch>
    </main>;
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return <ProtectedRoute
        exact={route.exact}
        key={i}
        path={route.path}
        render={route.render} />;
    } else {
      return <Route
        exact={route.exact}
        key={i}
        path={route.path}
        render={(props) => route.render({ ...props })} />;
    }
  };

  public render() {
    return <div>
      <Header onLogOut={() => console.log('asdas')} />
      {this.renderContent()}
    </div>;
  }
}

export { App };