import {legacy_createStore, applyMiddleware, compose, combineReducers} from 'redux'
import thunk from "redux-thunk"
import {AuthReducer} from './auth/reducer.js'
import { PostsReducer } from './posts/reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({AuthReducer, PostsReducer})
const store = legacy_createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
)

export {store}