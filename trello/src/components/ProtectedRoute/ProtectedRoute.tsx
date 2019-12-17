import React, { FunctionComponent, ReactElement } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { ROUTES_URLS } from "../App/routes";
import { connect } from 'react-redux';
import { AppState, isAuthenticated } from "../../store";
interface ProtectedRouteProps extends RouteProps {
  isAuthenticated?: boolean;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({ isAuthenticated, render, ...rest }: ProtectedRouteProps, ) => {
  return (
    <Route
      {...rest}
      render={
        (routeCompProps: RouteComponentProps) =>
          isAuthenticated ? (
            render!(routeCompProps)
          ) : (
              <Redirect
                to={{
                  pathname: ROUTES_URLS.LOGIN,
                  state: { from: routeCompProps.location }
                }}
              />
            )
      }
    />
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    isAuthenticated: isAuthenticated(state)
  };
};

const ConnectedRoute = connect(mapStateToProps)(ProtectedRoute);

export { ConnectedRoute as ProtectedRoute };