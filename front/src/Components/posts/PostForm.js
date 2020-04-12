import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addPost} from "../../actions/post";

const PostForm = ({addPost}) => {

    const [formData, setFormData] = useState({
        text:"",
        category: ""
    });

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const {text, category} = formData;
    const onSubmit = async e => {
        e.preventDefault();
        addPost(formData);
        setFormData({text:"",
        category: ""})
    }


    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            value={text}
            onChange={e => onChange(e)}
            placeholder="Create a post"
            required
          ></textarea>
          <input type="text" name="category" value={category} onChange={e => onChange(e)} required />
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

PostForm.propTypes = {
addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)
