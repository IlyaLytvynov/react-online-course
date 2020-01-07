import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from '../store/types';
import { Dispatch } from 'redux';
import { fetchToken } from '../store/auth';
// import Router from 'next/router';

interface DispatchProps {
  onFetchToken: (code: string) => void;
}

class Auth extends React.Component<DispatchProps> {
  static getInitialProps({ isServer }) {
    // store.dispatch(serverRenderClock(isServer));
    // store.dispatch(addCount());

    return { isServer };
  }

  public componentDidMount = async () => {
    if (this.isValid) {

    }
  };

  public render() {
    if (this.isValid) {
      return null;
    }
    return <h2>Hello world</h2>;
  }

  get isValid() {
    return false;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => ({
  onFetchToken: (code: string) => dispatch(fetchToken(code))
});


const ConnectedAuth = connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(Auth);

export default ConnectedAuth;


