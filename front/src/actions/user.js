import axios from "axios";
import {setAlert} from "./alert";
import {
    EDIT_ACTIVITY_CHECKLIST, POST_ERROR, GET_CHECKLIST
} from "./types";

export const updateChecklist = (user, checklist) => dispatch =>
{
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify({checklist});
    axios.put(`/users/${user}/checklist`, body,config)
    .then(
        res => {
            console.log(res);
            dispatch({
                type: EDIT_ACTIVITY_CHECKLIST,
                payload: res.data.checklist
            });
            dispatch(setAlert("Se modificó la lista", "success"));
        }
    )
    .catch(error => {
        console.log(error.response);
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(element => {dispatch(setAlert(element.msg, "danger"))
            });
        }
        dispatch({type: POST_ERROR})
    })

}

export const getChecklist = () => dispatch =>
{
    axios.get(`/getProfile`)
    .then(
        res => {
            dispatch({
                type: GET_CHECKLIST,
                payload:  res.data  && res.data.checklist ? res.data.checklist: []
            });
        }
    )
    .catch(error => {
        console.log(error);
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach(element => {dispatch(setAlert(element.msg, "danger"))
            });
        }
        dispatch({type: POST_ERROR})
    })

}
