import React from 'react';
import Loadable from '@loadable/component';
import { Route } from 'react-router';
import AuthRouter from './authRouter';

const TestRouter = () => (
  <Route
    path="/test"
  >
    <AuthRouter
      config={{
        component: Loadable(() => import('@/view/helloword/index.jsx')),
        path: '/',
      }}
    />
    <AuthRouter
      config={{
        component: Loadable(() => import('@/view/helloword2/index.jsx')),
        path: '/test/test2',
      }}
    />
  </Route>
);

export default TestRouter;
