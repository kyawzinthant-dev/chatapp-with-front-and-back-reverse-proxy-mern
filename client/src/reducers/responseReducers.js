import {GET_RESPONSE} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_RESPONSE:
            return payload;
            default:
                return state;
    }
}