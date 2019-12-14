import * as React from 'react';
import { Route, RouteComponentProps, Redirect, Switch, RouteChildrenProps, withRouter } from 'react-router-dom';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

import styles from './App.module.scss';
import { Header } from '../Header';

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

interface AppProps extends RouteComponentProps { }

const INITIAL_STATE = {
  token: '',
  userProfile: undefined,
  boards: []
};

interface CustomToken {
  token: string, expireIn: number;
}

class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  componentDidMount() {
    this.getToken();
  }

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const token = getFromLocalStorage(TOKEN_STRORAGE_KEY);
    if (!token) {
      return this.navigateToLogin();
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      const userProfile = await response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      return this.navigateToDashboard();
    }

    return this.navigateToLogin();
  }

  private navigateToDashboard() {
    this.props.history.push(ROUTES_URLS.DASHBOARD);
  }

  private navigateToLogin() {
    this.props.history.push(ROUTES_URLS.LOGIN);
  }

  private setProfile(userProfile: any) {
    this.setState({ userProfile });
  }

  private setToken = (token: string) => {
    this.setState({ token });
    setToLocalStorage(TOKEN_STRORAGE_KEY, token);
  };

  private get isLoggedIn() {
    return !!this.state.token;
  }

  private logOut = () => {
    this.setState(INITIAL_STATE);
    this.navigateToLogin();
  };

  private renderContent() {
    return <main className={styles.content}>
      <Switch>
        {routes.map(this.renderRoute)}
        <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
      </Switch>
    </main>;
  }

  private renderRoute = (route: AppRoute, i: number) => {
    console.log(route);
    if (route.isProtected) {
      return <ProtectedRoute
        exact={route.exact}
        key={i}
        path={route.path}
        render={route.render}
        isAuthenticated={this.isLoggedIn} />;
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
      <Header onLogOut={this.logOut} />
      {this.renderContent()}
    </div>;
  }
}

const AppWithRouter = withRouter(App);

export { AppWithRouter as App };