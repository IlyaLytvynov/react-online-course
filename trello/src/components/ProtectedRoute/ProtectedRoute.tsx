import React, { FunctionComponent, ReactElement } from "react";
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
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
                  pathname: "/login",
                  state: { from: routeCompProps.location }
                }}
              />
            )
      }
    />
  );
}

export { ProtectedRoute };