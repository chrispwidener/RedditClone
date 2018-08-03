import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getPosts } from '../actions';

class SearchBar extends React.Component {
    onSubmit({subreddit}) {
        this.props.history.push(`/${subreddit}`)    
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
})(connect(null, { getPosts })(SearchBar));