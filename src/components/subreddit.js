import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import {getPosts, clearPosts } from '../actions';
import SearchBar from './search_bar';
const Spinner = require('react-spinkit');

class PostsList extends React.Component {
    componentDidMount() {
        const {subreddit} = this.props.match.params;
        if (typeof subreddit !== 'undefined') {
            this.props.getPosts(subreddit);
        }
    }

    viewPost(subreddit, postId) {
        this.props.history.push(`/${subreddit}/${postId}`);
    }

    renderThumbnail (post) {
        const thumbnail = post.thumbnail;

        if (thumbnail === "self" || !thumbnail) {
            return;
        }

        return (
            <img src={thumbnail} alt="post thumbnail"></img>
        );
    }

    renderPosts() {
        const subreddit = this.props.match.params.subreddit;
        return _.map(this.props.posts, post => {
            const key = post.id;
            return (
                <tr key={key} className={"post-in-list"} onClick={ () => this.viewPost(subreddit, post.id)} >
                    <td>
                        <b>{post.author}</b><br/>
                        Upvotes: {post.score}<br/>
                        Comments: {post.num_comments}    
                    </td>
                    <td>
                        <Link to={`/${this.props.match.params.subreddit}/${post.id}`}>
                            {post.title}
                        </Link>
                    </td>
                    <td>
                        {this.renderThumbnail(post)}
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (_.isEmpty(this.props.posts)) {
            return ( 
                <div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <Spinner className="spinner" name="ball-spin-fade-loader" />
                    </div>
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