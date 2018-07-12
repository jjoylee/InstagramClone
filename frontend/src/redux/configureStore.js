import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import users from 'redux/modules/users';

const middlewares = [thunk];

const env = process.env.NODE_ENV; // prod or development environment

if(env === "development"){
    // devlopment 환경에서만 redux-logger 부르기 not in prod environment
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const reducer = combineReducers({
    users
});

let store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export default store();