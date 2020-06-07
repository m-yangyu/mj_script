import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import LoggerMiddleWare from './middleWare/logger';
import ReducerConfig from './Reducer';

const configureStore = () => createStore(
  ReducerConfig,
  applyMiddleware(
    thunkMiddleware,
    LoggerMiddleWare,
  ),
);

export default configureStore;
