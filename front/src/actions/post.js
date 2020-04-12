import axios from "axios";
import {setAlert} from "./alert";
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    SET_ALERT,
    GET_POST,
    ADD_COMMENT,
    REMOVE_COMMENT
} from "./types";

//Get posts
export const getPosts = () => dispatch => {
    axios.get("/posts")
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: POST_ERROR,
                payload: {msg: err, status: err}
            });
        })
}

//Update likes from post
export const updateLike = (postId, type) => dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const body = type === "dislike" ? JSON.stringify({dislike: true}) : JSON.stringify({like: true})
    axios.put(`/posts/${postId}`,body, config)
            .then(res => {
                console.log(res.data);
                dispatch({
                    type: UPDATE_LIKES,
                    payload: {id: postId, likes: res.data.likes, dislikes: res.data.dislikes}
                });
            })
            .catch(err => {
                dispatch({
                    type: POST_ERROR,
                    payload: {msg: err.response.statusText, status: err.response.status}
                });
            })
    
}

//Delete post
export const deletePost = (postId) => dispatch => {
    axios.delete(`/posts/${postId}`)
    .then(res => {
        dispatch({
            type: DELETE_POST,
            payload: postId
        });
        dispatch(setAlert("Post deleted", "success"));
    })
    .catch(err => {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    })
    
}

//Add post
export const addPost = formData => dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    axios.post(`/posts/`, formData, config)
    .then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch(setAlert("Post created", "success"));
    })
    .catch(err => {
        dispatch({
            type: POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    })
    
}

//Get post
export const getPost = postId => dispatch => {
    axios.get(`/posts/${postId}`)
        .then(res => {
            dispatch({
                type: GET_POST,
                payload: res.data[0]
            });
        })
        .catch(err => {
            dispatch({
                type: POST_ERROR,
                payload: {msg: err, status: err}
            });
        })
}


//Add post
export const updateComment = (postId, text) => async dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({"comment": text});
    try {
        const res = await axios.put(`/posts/${postId}`, body, config);
        dispatch({
            type: ADD_COMMENT,
            payload: res.data.comments
        });
        dispatch(setAlert("Se añadió el comentario", "success"));
    } catch (error) {
        console.log(error);
        dispatch({
            type: POST_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        });
    }
    
}