import React from 'react'
import {Link} from "react-router-dom"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Moment from "react-moment"

const CommentItem = ({postId, comment: {text, name, photo, user, date}}) => {
    console.log(text);
    return (
      <div className="media mb-4">
      <img className="d-flex mr-3 rounded-circle" style={{maxWidth:"38px"}}src={photo} alt=""/>
      <div className="media-body">
        <h5 className="mt-0">{name}</h5>
        {text}
      </div>
      <p className="p-auth">
      Publicado en  <Moment format=" DD/MM/YYYY">{date}</Moment>
      </p>
    </div>
    );
}

CommentItem.propTypes = {
    postId: PropTypes.string.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default  connect(mapStateToProps, null)(CommentItem)
