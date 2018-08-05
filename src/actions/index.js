import axios from 'axios';

//MISC
const rootUrl = "http://www.reddit.com/r/";

// ACTION STRINGS
export const GET_POSTS = "get_posts";
export const GET_POST = "get_post";
export const CLEAR_POST = "clear_post";
export const CLEAR_POSTS = "clear_posts";


// ACTION FUNCTIONS
export function getPosts(subreddit) {
    const request = axios.get(`${rootUrl}${subreddit}/top.json?t=day`);
    return {
        type: GET_POSTS,
        payload: request
    }
}

export function getPost(subreddit, id) {
    const url = `${rootUrl}${subreddit}/${id}.json`;
    const request = axios.get(url);
    return {
        type: GET_POST,
        payload: request
    }
}

export function clearPost() {
    return {
        type: CLEAR_POST,
        payload: {}
    }
}

export function clearPosts() {
    return {
        type: CLEAR_POSTS,
        payload: {}
    }
}