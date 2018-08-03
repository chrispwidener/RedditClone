import axios from 'axios';

//MISC
const rootUrl = "http://www.reddit.com/r/";

// ACTION STRINGS
export const GET_POSTS = "get_posts";
export const GET_POST = "get_post";


// ACTION FUNCTIONS
export function getPosts(subreddit) {
    const request = axios.get(`${rootUrl}${subreddit}/top.json?t=day`);

    console.log(subreddit);

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