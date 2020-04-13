import axios from "axios";
import {setAlert} from "./alert";
import {
    EDIT_ACTIVITY_CHECKLIST, POST_ERROR
} from "./types";

export const updateChecklist = (user, checklist) = dispatch =>
{
    const config = {
        headers: {
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify(checklist);
    console.log(body);
    axios.put(`/users/${user}/checklist`, body,config)
    .then(
        res => {
            dispatch({
                type: EDIT_ACTIVITY_CHECKLIST,
                payload: res.data.checklist
            });
            dispatch(setAlert("Se modificó la lista", "success"));
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