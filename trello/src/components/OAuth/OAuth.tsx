import React, { FunctionComponent } from "react";
import { RouteChildrenProps, Redirect } from "react-router";
import { ROUTES_URLS } from "../App/routes";
import { setToken } from "../../store/auth";
import { connect } from "react-redux";
import { inject } from "mobx-react";
import { STORE_IDS } from "../../observableStores";
import { AuthStore } from "../../observableStores/Auth";

interface OAuthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
  [STORE_IDS.AUTH]?: AuthStore;
}

@inject(STORE_IDS.AUTH)
class OAuth extends React.Component<OAuthProps> {
  render() {
    const { location: { hash }, onSetToken } = this.props;
    const token = hash.split('=')[1];
    onSetToken && onSetToken(token);
    this.props[STORE_IDS.AUTH]!.token = token;
    return <Redirect to={ROUTES_URLS.DASHBOARD} />;
  }
}

const mapDispathToProps = (dispatch: any) => {
  return {
    onSetToken: (token: string) => dispatch(setToken(token))
  };
};

const ConnectedOAuth = connect(undefined, mapDispathToProps)(OAuth);

export { ConnectedOAuth as OAuth };