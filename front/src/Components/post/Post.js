import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {getPost} from "../../actions/post"
import PostItem from "../posts/PostItem"
import CommentForm from './CommentForm';
import CommentItem from "./CommentItem.js";
import SyncLoader from "react-spinners/SyncLoader";
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
const Post = ({getPost, post: {post}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return (
        post !== null ? 
        <Container>
        <Row>
        <div className="col-lg-12">
        <h1 className="mt-4" style={{textAlign: "left", color:"black"}}>{post.title}</h1>
        <p className="lead">
          por {post.name}
        </p>
        <hr/>
        <p className="p-auth">Publicado en <Moment format="DD/MM/YYYY">{post.date}</Moment></p>
        <hr/>
        <img className="img-fluid rounded" src={post.image} alt=""/>
        <hr/>
        <p className="lead">{post.text} </p>
        <CommentForm postId={post._id}></CommentForm>
        <div className="comments">
            {post.comments.map((comment,index) => (
                <CommentItem key={index} comment={comment} postId={post._id}></CommentItem>
            ))}
        </div>
        </div>
        </Row>
        </Container>
  : (<SyncLoader></SyncLoader>)
    )
}

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
})
export default connect(mapStateToProps, {getPost})(Post)
