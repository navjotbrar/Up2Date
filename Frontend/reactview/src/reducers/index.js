import {combineReducers} from 'redux';

import userInfoReducers from './userInfoReducers';
import loadState from './loadState';


  
// const persistedState = loadState();

export default combineReducers({
    userInfo: userInfoReducers,
    persistedState: loadState
});