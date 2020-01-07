import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider } from 'mobx-react';
import './index.scss';
import configureStore from './store';
import { init } from './store/initialization';
import { stores } from './observableStores';

const history = createBrowserHistory();
const store = configureStore(history);
store.dispatch(init());

ReactDOM.render(
  <ReduxProvider store={store}>
    <ConnectedRouter history={history}>
      <Provider {...stores}>
        <App />
      </Provider>
    </ConnectedRouter>
  </ReduxProvider>, document.querySelector('#root'));
