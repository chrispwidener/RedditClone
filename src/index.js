import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

import SearchBar from './components/search_bar';
import Posts from './components/posts';
import ViewPost from './components/view_post';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/:subreddit/:id" component={ViewPost} />
                    <Route path="/:subreddit" component={Posts} />
                    <Route path="/" component={SearchBar} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();
