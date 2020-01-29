import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as api from './api';
import reducer from './reducer';

export const configure = () => {
  return createStore(
    reducer,
    applyMiddleware(thunkMiddleware.withExtraArgument({ api }))
  );
};