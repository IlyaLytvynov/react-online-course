import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { App } from './components/App';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';

import './index.scss';
import configureStore from './store';
import { init } from './store/initialization';

const history = createBrowserHistory();
const store = configureStore(history);
store.dispatch(init());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>, document.querySelector('#root'));