import React, { FunctionComponent } from 'react';

import { Link } from './Link';
import { routes, AppRoute } from '../App/routes';
import styles from './Header.module.scss';
import { Counter } from '../Counter';
import { AppState, isAuthenticated, logOut } from '../../store';
import { connect, MapStateToProps } from 'react-redux';

interface OwnProps {
}

interface StateProps {
  isAuthenticated: boolean;
}

interface DispatchProps {
  onLogOut: () => void;
}

const Header: FunctionComponent<StateProps & DispatchProps & OwnProps> = ({ onLogOut }: OwnProps & StateProps & DispatchProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.block}>
          {routes.map(({ title, path, isHidden }: AppRoute, i: number) =>
            isHidden ? null : (
              <Link key={i} title={title} path={path} />
            )
          )}
        </div>
        {isAuthenticated ? <button onClick={onLogOut}>Log out</button> : null}
      </div>
    </header>
  );
};

const mapStateToProps: MapStateToProps<StateProps, OwnProps, AppState> = (state: AppState): StateProps => {
  return {
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    onLogOut: () => dispatch(logOut())
  };
};

const ConnectedHeader = connect<StateProps, DispatchProps, OwnProps, AppState>(mapStateToProps, mapDispatchToProps)(Header);

export { ConnectedHeader as Header };
