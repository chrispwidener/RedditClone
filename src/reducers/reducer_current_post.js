// React or redux utils

// Other utils

// Local imports
import { GET_POST, CLEAR_POST } from '../actions';

export default function(state={}, action) {
    switch (action.type) {
        case GET_POST:
            return action.payload.data;
        case CLEAR_POST:
            return action.payload;
        default:
            return state;
    }
}