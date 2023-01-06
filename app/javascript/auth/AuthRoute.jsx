import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { AuthUserContext } from './AuthContext';

function AuthRoute({ children, isPrivate }) {
  const hasAuthenticatedUser = useContext(AuthUserContext);

  if (isPrivate) {
    return hasAuthenticatedUser ? children : <Navigate to="/app/sign_in" replace />;
  }
  return hasAuthenticatedUser ? <Navigate to="/app" replace /> : children;
}

AuthRoute.defaultProps = {
  isPrivate: true,
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isPrivate: PropTypes.bool,
};

export default AuthRoute;
