import {combineReducers} from 'redux';

import userInfoReducers from './userInfoReducers';
import loadState from './loadState';
import fetchPostReducer from './fetchPostReducer';
import searchInfoReducer from './searchInfoReducers';

  
// const persistedState = loadState();

export default combineReducers({
    userInfo: userInfoReducers,
    posts: fetchPostReducer,
    persistedState: loadState,
    searchInfo: searchInfoReducer
});