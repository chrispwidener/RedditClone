import React from 'react';
import { Field, reduxForm } from 'redux-form';

class SearchBar extends React.Component {
    onSubmit({subreddit}) {
        this.props.changeRoute(subreddit);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>               
                <Field
                    name="subreddit"
                    component="input"
                />
                <button type="submit">Get Posts</button>
            </form>
        );
    }
}

export default reduxForm ({
    form: 'SearchBarForm',
})(SearchBar);