import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import PostsReducer from './reducer_posts'; 
import CurrentPostReducer from './reducer_current_post';

const rootReducer = combineReducers({
    form: formReducer,
    posts: PostsReducer,
    current_post: CurrentPostReducer,
});

export default rootReducer;