import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import users from 'redux/modules/users';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import { i18nState } from 'redux-i18n';

const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

const env = process.env.NODE_ENV; // prod or development environment

if(env === "development"){
    // devlopment 환경에서만 redux-logger 부르기 not in prod environment
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const reducer = combineReducers({
    users,
    routing : routerReducer,
    i18nState
});

let store;

if(env === "development"){
    store = initialState => 
        createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
}else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export default store();
export { history };