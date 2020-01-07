import { Redirect, RouteComponentProps } from 'react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Action } from '../../store/types';
import { Dispatch } from 'redux';
import { fetchToken } from '../../store/auth';

interface DispatchProps {
  onFetchToken: (code: string) => void;
}

class Auth extends React.Component<DispatchProps & RouteComponentProps> {
  public componentDidMount = async () => {
    if (this.isValid) {
      const { location } = this.props;
      this.props.onFetchToken(location.search.split('=')[1]);
    }
  };

  public render() {
    if (this.isValid) {

      return null;
    }
  }

  get isValid() {
    return this.props.location.search.indexOf('code') !== -1;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => ({
  onFetchToken: (code: string) => dispatch(fetchToken(code))
});


const ConnectedAuth = connect<undefined, DispatchProps>(undefined, mapDispatchToProps)(Auth);

export { ConnectedAuth as Auth };



