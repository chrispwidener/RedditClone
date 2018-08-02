// React or redux utils

// Other utils
import _ from 'lodash';

// Local imports
import { GET_POSTS } from '../actions';

export default function(state={}, action) {
    switch (action.type) {
        case GET_POSTS:
            const posts_array = action.payload.data.data.children;
            return posts_array.reduce( (map, obj) => {
                map[obj.data.id] = obj.data;
                return map;
            }, {});
        default:
            return state;
    }
}