import {GET_CONTACTS} from '../actions/types';

export default function (state = null, {type,payload}){
    switch(type){
        case GET_CONTACTS:
            return payload;
            default:
                return state;
    }
}