import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './search_bar';
import { Link } from 'react-router-dom';

import _ from 'lodash';

class PostsList extends React.Component {

    renderPosts() {
        return _.map(this.props.posts, post => {
            const key = post.id;
            return (
                <tr key={key}>
                    <td>{post.score}</td>
                    <td>{post.author}</td>
                    <td>
                        <Link to={`/${post.id}`}>
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
                    <SearchBar />
                    <div>Enter a subreddit above</div>
                </div>
            );
        }
        return (
            <div>
            <SearchBar />
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

export default connect(mapStateToProps)(PostsList);