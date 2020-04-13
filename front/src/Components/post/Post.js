import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {getPost} from "../../actions/post"
import CommentForm from './CommentForm';
import CommentItem from "./CommentItem.js";
import Moment from 'react-moment';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loading from '../layout/Loading';
import {deletePost} from "../../actions/post"
const Post = ({getPost, deletePost, post: {post}, match, auth}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);
    return (
        post !== null ? 
        <Container>
        <Row>
        <div className="col-lg-12">
        <h1 className="mt-4" style={{textAlign: "left", color:"black"}}>{post.title}</h1>
        <div style={{float: "right"}}>
            <Button><FontAwesomeIcon icon={faArrowLeft} onClick={() => window.location.replace("/forum")}></FontAwesomeIcon></Button>
            {!auth.loading && post.user === auth.user._id && 
            <Button variant="danger"><FontAwesomeIcon icon={faTrash} onClick={() => deletePost(post._id)} ></FontAwesomeIcon></Button>}
        </div>
        <p className="lead">
          por {post.name}
        </p>
        <hr/>
        <p className="p-auth">Publicado en <Moment format="DD/MM/YYYY">{post.date}</Moment></p>
        <hr/>
        <img className="img-fluid rounded" src={post.image} alt=""/>
        <hr/>
        <p className="lead" style={{textAlign:"justify"}}>{post.text} </p>
        <CommentForm postId={post._id}></CommentForm>
        <div className="comments">
            {post.comments.map((comment,index) => (
                <CommentItem key={index} comment={comment} postId={post._id}></CommentItem>
            ))}
        </div>
        </div>
        </Row>
        </Container>
  : (<Loading></Loading>)
    )
}

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired,
deletePost: PropTypes.func.isRequired,
auth: PropTypes.object
}

const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
    
})
export default connect(mapStateToProps, {getPost, deletePost})(Post)
