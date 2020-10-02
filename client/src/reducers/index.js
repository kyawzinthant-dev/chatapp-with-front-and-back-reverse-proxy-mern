import { combineReducers } from 'redux';
import authReducers from './authReducers';
import contactReducers from './contactReducers';
import messageReducers from './messageReducers';
import allReducers from './allReducers';
import requestReducers from './requestReducers';
import responseReducers from './responseReducers';

export default combineReducers({
    auth: authReducers,
    contact:contactReducers,
    message:messageReducers,
    all:allReducers,
    req:requestReducers,
    res:responseReducers
})