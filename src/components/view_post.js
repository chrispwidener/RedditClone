import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ViewPost extends React.Component {

    render () {
        const {post} = this.props;

        if (!post) {
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

function mapStateToProps({ posts }, ownProps) {
    const { postId } = ownProps.match.params;
    console.log(postId);
    return { post: posts[postId] };
}

export default connect(mapStateToProps, null)(ViewPost);