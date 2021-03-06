// React or redux utils

// Other utils

// Local imports
import { GET_POSTS, CLEAR_POSTS } from '../actions';

export default function(state={}, action) {
    switch (action.type) {
        case GET_POSTS:
            if (typeof action.payload.data === 'undefined') {
                return;
            }
            const posts_array = action.payload.data.data.children;
            return posts_array.reduce( (map, obj) => {
                map[obj.data.id] = obj.data;
                return map;
            }, {});
        case CLEAR_POSTS:
            return action.payload;
        default:
            return state;
    }
}