module.exports = function() {
  return `import React from 'react';
import {
  HashRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import RouterConfig from './router';
import configureStore from './redux/store';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Router>
      {
          Object.keys(RouterConfig).map((name) => {
            const CurrentRouter = RouterConfig[name];
            return <CurrentRouter key={name} />;
          })
      }
    </Router>
  </Provider>
);

export default App;
`
}