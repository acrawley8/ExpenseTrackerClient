import { FETCH_AGGREGATE } from '../actions/types';

export default function (state = {}, action) {
    switch(action.type) {
        case FETCH_AGGREGATE:
            return action.payload;
        default:
            return state;
    }
};
