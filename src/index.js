import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

import SearchBar from './components/search_bar';
import Subreddit from './components/subreddit';
import ViewPost from './components/view_post';

import './static/style.css';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/:subreddit/:id" component={ViewPost} />
                    <Route path="/:subreddit" component={Subreddit} />
                    <Route path="/" component={Subreddit} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();
