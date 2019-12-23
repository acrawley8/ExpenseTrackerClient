import { FETCH_TYPES } from '../actions/types';

export default function (state = [], action) {
    switch(action.type) {
        case FETCH_TYPES:
            return action.payload;
        default:
            return state;
    }
};