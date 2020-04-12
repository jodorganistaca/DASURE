import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {updateComment} from "../../actions/post"
import Alert from '../layout/Alert'

const CommentForm = ({postId, updateComment}) => {

    const onChange = e => setText(e.target.value);
    const onSubmit = async e => {
        e.preventDefault();
        updateComment(postId, text);
        setText("");
    }

    const [text, setText] = useState("")
    return (
      <div className="card my-4">
        <Alert></Alert>
          <h5 className="card-header">Deja un comentario</h5>
          <div className="card-body">
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <textarea className="form-control"onChange={e => onChange(e)} name="text" placeholder="Deja un comentario" rows="3" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Publicar</button>
            </form>
          </div>
        </div>
    )
}

CommentForm.propTypes = {
  updateComment: PropTypes.func.isRequired
}

export default connect(null, {updateComment})(CommentForm)
