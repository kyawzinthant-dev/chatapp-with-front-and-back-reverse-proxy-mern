import {GET_ALL} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_ALL:
            return payload;
            default:
                return state;
    }
}