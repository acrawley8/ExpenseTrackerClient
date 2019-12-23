import { FETCH_TOTALS } from '../actions/types';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_TOTALS:
            return action.payload;
        default:
            return state;
    }
};