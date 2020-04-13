import {
    EDIT_ACTIVITY_CHECKLIST, GET_CHECKLIST
} from "../actions/types";

const initialState = {
    checklist:[]
};

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case EDIT_ACTIVITY_CHECKLIST:
            return {
                ...state,
                checklist: payload,
                loading: false
            }
            case GET_CHECKLIST:
            return {
                ...state,
                checklist: payload,
                loading: false
            }
        default: return state
    }
};