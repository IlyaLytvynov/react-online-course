import * as React from 'react';
import { Route, Link, RouteComponentProps, Redirect, Switch, RouteChildrenProps, withRouter } from 'react-router-dom';
import { setToLocalStorage, getFromLocalStorage } from '../../utils';
import { Dashboard } from '../Dashboard';
import { Login } from '../Login/Login';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

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
}

interface CustomToken {
  token: string, expireIn: number;
}

class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  componentDidMount() {
    console.log(this.props);
    this.getToken();
  }

  private async getToken() {
    if (this.state.token) {
      return;
    }

    const { token } = getFromLocalStorage<CustomToken>(TOKEN_STRORAGE_KEY);
    if (!token) {
      return this.navigateToLogin()
    }

    const url = `https://api.trello.com/1/members/me?key=${REACT_APP_API_KEY}&token=${token}`;
    const response = await fetch(url);

    if (response.ok === true && response.status === 200) {
      const userProfile = await response.json();
      this.setProfile(userProfile);
      this.setToken(token);
      return this.navigateToDashboard()
    }

    return this.navigateToLogin()
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
    setToLocalStorage<CustomToken>(TOKEN_STRORAGE_KEY, { token, expireIn: Date.now() });
  }

  private get isLoggedIn() {
    return !!this.state.token
  }

  private renderHeader() {
    return <header>
      {routes.map((route: AppRoute, i: number) => route.isHidden ? null : <Link key={i} to={route.path}>{route.title}</Link>)}
      <button onClick={this.logOut}>Log out</button>
    </header>
  }

  private logOut = () => {
    this.setState(INITIAL_STATE);
    this.navigateToLogin();
  }

  private renderContent() {
    return <main>
      <Switch>
        {routes.map(this.renderRoute)}
        <Route path={ROUTES_URLS.OAUTH} render={(props: RouteChildrenProps) => <OAuth {...props} onSetToken={this.setToken} />} />
        <Redirect to={ROUTES_URLS.NOT_FOUND} />
      </Switch>
    </main>
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return <ProtectedRoute
        exact={route.exact}
        key={i}
        path={route.path}
        render={route.render}
        isAuthenticated={this.isLoggedIn} />
    } else {
      return <Route
        exact={route.exact}
        key={i}
        path={route.path}
        render={(props) => route.render({ ...props })} />
    }
  }

  public render() {
    return <div>
      {this.renderHeader()}
      {this.renderContent()}
    </div>
  }
}

const AppWithRouter = withRouter(App);

export { AppWithRouter as App };