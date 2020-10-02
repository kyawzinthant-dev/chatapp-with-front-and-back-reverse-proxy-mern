import {GET_MESSAGES} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_MESSAGES:
            return payload;
            default:
                return state;
    }
}