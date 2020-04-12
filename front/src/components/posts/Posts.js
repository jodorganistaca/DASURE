import React, { useEffect, Fragment } from 'react'
import "../../Styles/posts/Posts.css"
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import PostItem from "./PostItem";

//Spinner

import {getPosts} from "../../actions/post";
import PostForm from './PostForm';
import  Row  from 'react-bootstrap/Row';
import SyncLoader from "react-spinners/SyncLoader";
import Container from 'react-bootstrap/Container';

const Posts = ({getPosts, post: {posts, loading}}) => {
    useEffect(() => {getPosts();}, [getPosts]);
    return loading ? (<SyncLoader/>) : 
            (<section className="blog-area section">
                <PostForm></PostForm>
            <Container>
                <Row style={{cursor:"auto"}}>
                {posts.sort((a,b) => - (a.likes.length - a.dislikes.length - (b.likes.length - b.dislikes.length))).map(post => (
                <PostItem key={post._id} post={post}></PostItem>))}
            </Row>
            </Container>
            </section>)
    
}

Posts.propTypes = {
getPosts: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, {getPosts})(Posts);
