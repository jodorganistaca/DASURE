import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Loading from '../layout/Loading';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {getChecklist, updateChecklist} from "../../actions/user";
import { Button, Row, Col } from 'react-bootstrap';
import "../../Styles/user/Checklist.css"

const Checklist = ({getChecklist, updateChecklist, user: {checklist, loading}, auth}) => {
    useEffect(() => {
        getChecklist();
    }, [getChecklist]);

    const [newtask, setNewtask] = useState("");
    const [newdone, setNewdone] = useState(false);
    const [addOne, setAddOne] = useState(true);
    const addNew = () => {
            let array = [];
            array.push({text: newtask, done: newdone});
            if(checklist && checklist.length > 0)
                {
                    checklist.push({text: newtask, done: newdone});
                    array = checklist;
                }
            updateChecklist(auth.user._id, array)
            setAddOne(true);
            setNewtask("");
    }
    return ( !loading ?
        <Fragment>
            <form id="todo-list">
                {checklist.map((v,k) => (
                    <Row className="todo-wrap" key={k}>
                <Col md={10}>
                <input id={k} type="checkbox" defaultChecked={v.done} onChange={() => {v.done = !v.done; updateChecklist(auth.user._id, checklist);}}/>
                <label htmlFor={k} className="todo">
                <i className="fa fa-check"></i>
                {v.text}
                </label>
                </Col>
                <Col md={2}>
                <span className="delete-item" title="remove" onClick={() => {
                    checklist.splice(checklist.indexOf(v), 1);
                    updateChecklist(auth.user._id, checklist)}}>
                <i className="fa fa-times-circle"></i>
                </span>
                </Col>
                </Row>
                
                )
                 )}
        {!addOne ? (<Row className="editing todo-wrap" style={{display: "block"}}>
                <Col md={12}>
                <input type="checkbox" defaultChecked={newdone} onChange={() =>  setNewdone(!newdone)}/>
                <label  className="todo">
                    <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    <Col md={10}>
                    <input autoFocus  type="text" className="input-todo" value={newtask} onChange={(e) => setNewtask(e.target.value)} 
                    onKeyPress={e => {
                        if(e.key === 'Enter')
                        {
                            addNew();
                        }
                        }}/>
                    </Col>
                    </label>
                    </Col>
                    </Row>) : <></>}
 
        <Row id="add-todo" onClick={() => setAddOne(false)}>
            <i className="fa fa-plus" ></i>
            Añadir una tarea
        </Row>
        
</form>
        </Fragment> :
        <Loading></Loading>
    )
}

Checklist.propTypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = state  => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, {getChecklist, updateChecklist})(Checklist)
