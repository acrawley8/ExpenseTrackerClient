import { FETCH_EXPENSES } from '../actions/types';

export default function (state = [], action) {
    switch(action.type) {
        case FETCH_EXPENSES:
            return action.payload;
        default:
            return state;
    }
};