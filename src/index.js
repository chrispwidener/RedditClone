import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import store from './store';

import Posts from './components/posts';
import ViewPost from './components/view_post';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/:postId" component={ViewPost} />
                    <Route path="/" component={Posts} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));

registerServiceWorker();
