import {GET_USER} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_USER:
            return payload;
            default:
                return state;
    }
}