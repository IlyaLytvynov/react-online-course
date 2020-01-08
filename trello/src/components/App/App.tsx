import * as React from 'react';
import { Route, Switch, RouteChildrenProps } from 'react-router-dom';
import { routes, AppRoute, ROUTES_URLS } from './routes';
import { OAuth } from '../OAuth';
import { ProtectedRoute } from '../ProtectedRoute';

import styles from './App.module.scss';
import { Header } from '../Header';
import { inject, observer } from 'mobx-react';
import { STORE_IDS } from '../../observableStores';
import { UiStore } from '../../observableStores/UiStire';
import { Notifications } from '../Notifications';
import { HelloWorldContext } from '../../contexts/HelloWorldContext';


interface AppState {
}

interface AppProps {
  [STORE_IDS.UI]?: UiStore;
}

const INITIAL_STATE = {
  token: '',
  userProfile: undefined,
  boards: [],
  title: 'TEst'
};

@inject(STORE_IDS.UI)
@observer
class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  private renderContent() {
    const store = this.props[STORE_IDS.UI];
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

  changeTitle = (title: string) => {
    this.setState((state) => {
      return { ...state, title };
    });
  };

  public render() {
    const { title } = this.state;
    return <div className={styles.content}>
      <HelloWorldContext.Provider value={{ title, changeTitle: this.changeTitle }}>
        <Header />
        <Notifications />
        {this.renderContent()}
      </HelloWorldContext.Provider>
    </div>;
  }
}

export { App };