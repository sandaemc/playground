import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducers } from './state';
import thunkMiddleware from 'redux-thunk';
import * as api from './api';

export const configure = () => 
    createStore(
        combineReducers({ 
            prices: reducers.pricesReducer, 
            dirtness: reducers.dirtnessReducer,
            progress: reducers.requestProgressReducer
        }),
        applyMiddleware(thunkMiddleware.withExtraArgument(api)));