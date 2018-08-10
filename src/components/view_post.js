import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getPost, clearPost } from '../actions';
import Comment from './comment';
import SearchBar from './search_bar';

const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();

class ViewPost extends React.Component {

    componentDidMount() {
        const {subreddit, id} = this.props.match.params;
        this.props.clearPost();
        this.props.getPost(subreddit, id);
    }

    renderComments(comments) {
        const author = this.props.post.author;
        return _.map(comments, comment => {
            return <Comment comment={comment} op={author} key={comment.data.id}/>;
        });
    }

    renderMedia(post) {
        const media_embed = post.media_embed;
        const post_hint = post.post_hint;


        // post_hint types: "image", "link", "rich:video"
        switch (post_hint) {
            case "image":
                return <img src={post.url} alt="post"></img>;
            case "link":
                return <a href={post.url} target="_blank">Article Link</a>;
            case "rich:video":
                const text = entities.decode(media_embed.content);
                return (
                    <div dangerouslySetInnerHTML={{__html: text}}></div>
                );
            case "hosted:video":
                const secure_media = post.secure_media;
                const height = secure_media.height;
                const width = secure_media.width;
                const media = secure_media.hls_url;
                return <video src={media} height={height} width={width}><source src={media}></source></video>
            default:
        }


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
                <SearchBar />
                <Link to={`/${post["subreddit"]}`}>Back to r/{post["subreddit"]}</Link>
                <div>
                    <h2>{post.title}</h2>
                     <h5>
                        Author: {post.author} <br/>
                        Upvotes: {post.score} <br/>
                        Comments: {post.num_comments}
                    </h5>
                </div>
                <div>
                    {this.renderMedia(post)}
                    <h4 dangerouslySetInnerHTML={{__html: postText}}></h4>
                </div>
                <div>
                    <h2>Comments:</h2>
                    <h6>Click comment to collapse</h6>
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

export default connect(mapStateToProps, { getPost, clearPost })(ViewPost);