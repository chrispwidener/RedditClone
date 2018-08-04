import React from 'react';
import _ from 'lodash';
import '../static/style.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibile: true
        };
    }

    toggleVisibility() {
        this.setState(() => {
            return {
                visibile: !this.state.visibile
            };
        });
    }

    getReplies(replies) {
        if (!replies || replies === "") {
            return {};
        } else {
            return replies.data.children;
        }
    }

    renderReplies(replies) {
        if (_.isEmpty(replies)) {
            return;
        }
        return _.map(replies, reply => {
            return <Comment comment={reply} key={reply.data.id} />
        });
    }

    getClassName() {
        if (this.state.visible === true) {
            return 'comment';
        }
        return 'comment collapsed';
    }

    render() {
        const comment = this.props.comment;
        const author = comment.data.author;
        const upvotes = comment.data.score;
        const body = comment.data.body;
        const replies = this.getReplies(comment.data.replies);

        if (this.state.visibile === false) {
            return (
                <div className="comment collapsed" onClick={this.toggleVisibility.bind(this)}>
                    <span>
                        <h5>{upvotes} -- {author}</h5>
                    </span>
                </div>
            );
        }

        return (
            <div className="comment">
                <div onClick={this.toggleVisibility.bind(this)}>
                    <span>
                        <h5>{upvotes} -- {author}</h5>
                    </span>
                    {body}
                </div>
                {this.renderReplies(replies)}
            </div>
        );
    }
}

export default Comment;