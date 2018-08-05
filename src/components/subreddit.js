import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {getPosts, clearPosts } from '../actions';
import SearchBar from './search_bar';


class PostsList extends React.Component {
    componentDidMount() {
        const {subreddit} = this.props.match.params;
        if (typeof subreddit !== 'undefined') {
            this.props.clearPosts();
            this.props.getPosts(subreddit);
        }
    }

    changeSubreddit(subreddit) {
        this.props.clearPosts();
        this.props.getPosts(subreddit);
        this.props.history.push(`/${subreddit}`);
    }

    renderPosts() {
        return _.map(this.props.posts, post => {
            const key = post.id;
            return (
                <tr key={key}>
                    <td className="post-in-list">{post.score}</td>
                    <td>{post.author}</td>
                    <td>
                        <Link to={`/${this.props.match.params.subreddit}/${post.id}`}>
                            {post.title}
                        </Link>
                    </td>
                    <td>{post.num_comments}</td>
                </tr>
            );
        });
    }

    render() {
        if (_.isEmpty(this.props.posts)) {
            return ( 
                <div>
                    <SearchBar changeRoute={(subreddit) => {
                        this.changeSubreddit(subreddit);
                    }} />
                    <p>Enter Subreddit Above</p>
                </div>
            );
        }
        return (
            <div>
                <SearchBar changeRoute={(subreddit) => {
                    this.changeSubreddit(subreddit);
                }}/>
                <h1>r/{this.props.match.params.subreddit}</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Upvotes:</th>
                            <th>Poster:</th>
                            <th>Title:</th>
                            <th>Num Comments:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPosts() }
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.posts }
}

export default connect(mapStateToProps, { getPosts, clearPosts })(PostsList);