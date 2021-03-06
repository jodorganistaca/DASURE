import axios from "axios";
import {setAlert} from "./alert";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types"

import { Router, Route } from 'react-router-dom'

export const loadUser = () => async dispatch => {
try {
    const res  = await axios.get("/getProfile");
    dispatch({
        type: USER_LOADED,
        payload: res.data
    })
} catch (error) {
    dispatch({
        type: AUTH_ERROR
    })
}
} 

//Register User
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post("/users", body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(element => {dispatch(setAlert(element.message, "danger"))
                
            });
        }
        dispatch({type: REGISTER_FAIL})
    }
};

//Login User
export const login = (email, password, googleLogin = false) => async dispatch => {
    if(!googleLogin)
    {
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({email, password});
        axios.post("/auth", body, config)
        .then(() => axios.get("/getProfile"))
        .then(res => {
            dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data});
            dispatch(loadUser());
        }
        )
        .catch(error => {
            const errors = error.response.data.errors;

            if(errors){
            errors.forEach(element => {dispatch(setAlert(element.msg, "danger"))
            });
            dispatch({type: LOGIN_FAIL})
        }
        })
    }
    else return true;
};

export const loginGoogle = () => async dispatch => {
  

    try {
        const res = await axios.get("/getProfile");

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (error) {
        console.log(error.response);
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(element => {dispatch(setAlert(element.msg, "danger"))
                
            });
        }
        dispatch({type: LOGIN_FAIL})
    }
};

//Logout /Clear Profile
export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}