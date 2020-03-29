import React from 'react';
import Loadable from '@loadable/component';
import { Route, Redirect } from 'react-router';
import AuthRouter from './authRouter';

const LoginRouter = () => (
  <Route
    path="/"
  >
    <AuthRouter
      exact
      config={{
        path: '/',
      }}
    >
      <Redirect to="/login" />
    </AuthRouter>
    <AuthRouter
      config={{
        path: '/login',
        component: Loadable(() => import('@/view/Login/index.jsx')),
      }}
    />
  </Route>
);

export default LoginRouter;
