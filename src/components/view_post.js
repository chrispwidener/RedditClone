import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'lodash';

import { getPost } from '../actions';

class ViewPost extends React.Component {
    componentDidMount() {
        const {subreddit, id} = this.props.match.params;
        this.props.getPost(subreddit, id);
    }

    render () {
        const { post } = this.props;

        if (_.isEmpty(post)) {
            return (
                <div>
                    <Link to="/">
                        Post not found, return home
                    </Link>
                </div>
            );
        }

        const postText = post.selftext.split('\n').join('<br />');

        return (
            <div>
                <Link to="/">Back</Link>
                <div>
                    <h2>{post.title}</h2>
                     <h5>
                        Author: {post.author} <br/>
                        Upvotes: {post.score} <br/>
                        Comments: {post.num_comments}
                    </h5>               </div>
                <div>
                    <h4 dangerouslySetInnerHTML={{__html: postText}}></h4>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ current_post }) {
    if (current_post.length === 2) {
        return {
            post: current_post[0].data.children[0].data,
            comments: current_post[1].data.children
        };
    } else {
        return {};
    }
}

export default connect(mapStateToProps, { getPost })(ViewPost);