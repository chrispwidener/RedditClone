import { createStore, applyMiddleware } from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import promise from 'redux-promise';

import rootReducer from "../reducers/index";

const store = createStore(
    rootReducer, 
    composeWithDevTools(
        applyMiddleware(
            promise,
        )
    )
);

export default store;