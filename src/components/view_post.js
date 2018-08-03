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

    getReplies(replies) {
        console.log(replies);
        if (!replies || replies === "") {
            return {};
        } else {
            return replies.data.children;
        }
    }

    renderComments(comments) {
        if (_.isEmpty(comments)) {
            return;
        }

        return _.map(comments, comment => {
            const author = comment.data.author;
            const upvotes = comment.data.score;
            const body = comment.data.body;
            const id = comment.data.id;
            const replies = this.getReplies(comment.data.replies);

            return (
                <div className="comment" key={id}>
                    <span>
                        <h5>{upvotes}<br/>{author}</h5>
                    </span>
                    {body}
                    {this.renderComments(replies)}
                </div>
            );
        })
    }

    render () {
        const { post } = this.props;

        if (_.isEmpty(post)) {
            return (
                <div>
                    <Link to="/">
                        Loading, click to go back
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
                    </h5>
                </div>
                <div>
                    <h4 dangerouslySetInnerHTML={{__html: postText}}></h4>
                </div>
                <div>
                    <h2>Comments:</h2>
                    {this.renderComments(this.props.comments)}
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