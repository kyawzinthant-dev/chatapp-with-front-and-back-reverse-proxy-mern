import {GET_REQUEST} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_REQUEST:
            return payload;
            default:
                return state;
    }
}