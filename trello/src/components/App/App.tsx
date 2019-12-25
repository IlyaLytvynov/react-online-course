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



interface AppState {
}

interface AppProps {
  [STORE_IDS.UI]?: UiStore;
}

const INITIAL_STATE = {
  token: '',
  userProfile: undefined,
  boards: []
};

@inject(STORE_IDS.UI)
@observer
class App extends React.Component<AppProps, AppState> {
  public state = INITIAL_STATE;

  private renderContent() {
    const store = this.props[STORE_IDS.UI];
    return <main className={styles.content}>
      {store!.screen.w}
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
      <Notifications />
      {this.renderContent()}
    </div>;
  }
}

export { App };