import {combineReducers} from 'redux';

import userInfoReducers from './userInfoReducers';
import loadState from './loadState';
import fetchPostReducer from './fetchPostReducer';


  
// const persistedState = loadState();

export default combineReducers({
    userInfo: userInfoReducers,
    posts: fetchPostReducer,
    persistedState: loadState
});