import axios from 'axios';

//MISC
const rootUrl = "http://www.reddit.com/r/";

// ACTION STRINGS
export const GET_POSTS = "get_posts";


// ACTION FUNCTIONS
export function getPosts({subreddit}) {
    const request = axios.get(`${rootUrl}${subreddit}/top.json?t=day`);

    return {
        type: GET_POSTS,
        payload: request
    }
}
