import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { getPosts } from '../actions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
    onSubmit(fields) {
        const sr = fields.subreddit;
        const ctx = fields.context;
        const tfrm = fields.timeframe;
        this.props.changeRoute(sr);
        this.props.getPosts(sr, ctx, tfrm);
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className="searchbar">               
                <Field
                    name="subreddit"
                    component="input"
                    className="field"
                    placeholder="Enter Subreddit"
                />
                <Field 
                    name="context" 
                    component="select"
                    className="field"
                    value="top"
                    placebolder=""
                >
                    <option value="top">Top</option>
                    <option value="hot">Hot</option>
                    <option value="new">New</option>
                    <option value="controversial">Controversial</option>
                </Field>
                <Field 
                    name="timeframe" 
                    component="select" 
                    className="field"
                    value="day"
                >
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </Field>
                <button type="submit" className="field">Get Posts</button>
            </form>
        );
    }
}

export default reduxForm ({
    form: 'SearchBarForm',
})( connect(null, {getPosts})(SearchBar));