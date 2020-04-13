import React, { useEffect, Fragment, useState } from 'react'
import "../../Styles/posts/Posts.css"
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import PostItem from "./PostItem";
import {getPosts} from "../../actions/post";
import PostForm from './PostForm';
import  Row  from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Navbar, Nav } from 'react-bootstrap';
import Loading from '../layout/Loading';
import { Link } from 'react-router-dom';
import Alert from "../layout/Alert";
import Menu from "../Menu";

const Posts = ({getPosts, post: {posts, loading}}) => {
    const [category, setCategory] = useState("");
    const getCategories = posts => {
        let array = [];
        for (let i = 0; i < posts.length; i++) {
            array.push(posts[i].category);
        }
        return array.filter((value, index, self) => self.indexOf(value) === index);
    };
    const categories = getCategories(posts);
    console.log(categories);
    const [profile, setProfile] = useState({
        name: "UserX",
        photo: require('../../Assets/icon.png'),
        likedMovies: [],
        likedSeries: [],
        likedBooks: [],
        likedActivities: [],
    });
    let flag = false;
    const ShowSideMenu = () => {

        var element = document.getElementById('menu');
        if(flag){
            element.style.transform = 'translate(15vw)';
        }else{
            element.style.transform = 'translate(-15vw)';
        }
        element.style.zIndex = '25';
        element.style.transition = 'transform 500ms';
        flag = !flag;
    };
    useEffect(() => {getPosts();}, [getPosts]);

    return loading ? (<Loading/>) : 
            ( <Fragment>

            <Navbar bg="light" expand="lg">
                    <Navbar.Brand>
                        <Link to="/">
                            <img className = "forum-navbar-logo" src={require("../../Assets/dasure-02.png")} alt="Series" to="/" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {categories.map((v,k) => <Nav.Link key={k} onClick={e => {e.preventDefault(); setCategory(v)}}>{v}</Nav.Link>)}
                            <Nav.Link onClick={e => {e.preventDefault(); setCategory("Todas las publicaciones")}}>Todas las publicaciones</Nav.Link>
                        </Nav>   
                    </Navbar.Collapse>
                    </Navbar>
            <div className="posts-header">
                        <img className = "posts-logo" src={profile.photo} alt="profile" />
                        <div className="posts-header-title">
                            <h1 className="posts-header-title-text">
                                Foro
                            </h1>
                        </div>
            </div>
            <section className="blog-area section .body-posts" style={{marginTop: 215}}>
                <Alert></Alert>
                <PostForm></PostForm>
            <Container>
                <Row style={{cursor:"auto"}}>
                {!category || category==="Todas las publicaciones" ? posts.sort((a,b) => - (a.likes.length - a.dislikes.length - (b.likes.length - b.dislikes.length))).map(post => (
                <PostItem key={post._id} post={post}></PostItem>)) :  (posts.filter(post => post.category === category).sort((a,b) => - (a.likes.length - a.dislikes.length - (b.likes.length - b.dislikes.length))).map(post => (
                <PostItem key={post._id} post={post}></PostItem>)))}
            </Row>
            </Container>
            </section>
            </Fragment>
            )
    
}

Posts.propTypes = {
getPosts: PropTypes.func.isRequired,
post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, {getPosts})(Posts);
