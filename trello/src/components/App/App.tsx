import * as React from 'react';
import {
  Route,
  Link,
  RouteComponentProps,
  Redirect,
  Switch,
  RouteChildrenProps,
  withRouter,
} from 'react-router-dom';
import { routes, AppRoute } from './routes';
import { OAuth } from '../OAuth';

const TOKEN_STRORAGE_KEY = 'TOKEN';

interface Board {
  id: string;
  name: string;
  pinned: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}
class App extends React.Component<RouteComponentProps, AppState> {
  public state = {
    token: '',
    boards: [],
  };

  componentDidMount() {
    const existingToken = localStorage.getItem(TOKEN_STRORAGE_KEY);
    if (existingToken) {
      this.setState({ token: existingToken });
      this.props.history.push('/dashboard');
    } else {
      this.props.history.push('/login');
    }
  }

  private setToken = (token: string) => {
    localStorage.setItem(TOKEN_STRORAGE_KEY, token);
    this.setState({ token }, () => {
      console.log('TEST');
    });
  };

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    return (
      <header>
        {routes.map((route: AppRoute, i: number) =>
          route.isHidden ? null : (
            <Link key={i} to={route.path}>
              {route.title}
            </Link>
          )
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map((route: any, i: number) => (
            <Route
              exact={route.exact}
              key={i}
              path={route.path}
              render={(props) => route.render({ ...props })}
            />
          ))}
          <Route
            path='/oauth'
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          <Redirect to='/404' />
        </Switch>
      </main>
    );
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export { AppWithRouter as App };
