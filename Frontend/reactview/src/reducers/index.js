import {combineReducers} from 'redux';

import userInfoReducers from './userInfoReducers';



export default combineReducers({
    userInfo: userInfoReducers
});