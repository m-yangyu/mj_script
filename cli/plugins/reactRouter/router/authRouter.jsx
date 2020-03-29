import React from 'react';
import { Route, Redirect } from 'react-router';

const AuthRouter = (props) => {
  const token = sessionStorage.getItem('token');
  const { config, children } = props;

  if (!token && config.path !== '/login') {
    return <Redirect to="/login" />;
  }

  return (
    <Route
      path={config.path}
      component={config.component}
      {...props}
    >
      {children}
    </Route>
  );
};

export default AuthRouter;
