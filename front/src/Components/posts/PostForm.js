import React, {useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addPost} from "../../actions/post";
import {Modal, Button} from "react-bootstrap"
const PostForm = ({addPost}) => {

    const [formData, setFormData] = useState({
        text:"",
        category: "",
        image: "",
        title: ""
    });

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});
    const {text, category, image, title} = formData;
    const onSubmit = async e => {
        e.preventDefault();
        handleClose();
        addPost(formData);
        setFormData({text:"",
        category: "", image:"", title:""})
    }


    return (
      <Fragment>
        <Button variant="primary" onClick={handleShow}>
        Publica algo!
      </Button>
      <Modal show={show} onHide={handleClose} contentClassName="modal-dialog modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Crear un nueva publicación</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div style={{margin: "auto"}}>
          <div class="contact100-form-title" style={{backgroundImage: `url(${!image ? "https://images.assetsdelivery.com/compings_v2/kchung/kchung1608/kchung160800090.jpg" : image })`, backgroundSize: "contain", backgroundRepeat: "no-repeat", width: "100%", height: "0", paddingTop: "51%", backgroundPosition: "top center"}}>
          </div>
          </div>
          <form class="contact100-form validate-form">
          <div class="wrap-input100 validate-input">
          <input id="name" class="input100" type="text" name="title" value={title} onChange={e => onChange(e)} required/>
          <span className="focus-input100"></span>
					<span className="label-input100">Título de la publicación</span>
          </div>
          <div class="wrap-input100 validate-input">
          <input id="email" class="input100" type="text" name="category" value={category} onChange={e => onChange(e)}  required/>
          <span className="focus-input100"></span>
					<span className="label-input100">Categoría de la publicación</span>
          </div>
          <div class="wrap-input100 validate-input">
          <input id="phone" class="input100" type="text" name="image" value={image} onChange={e => onChange(e)}  required/>
          <span className="focus-input100"></span>
					<span className="label-input100">Imagen de la publicación</span>
          </div>
          <div class="wrap-input100 validate-input">
          <textarea id="message" class="input100" name="text" value={text} onChange={e => onChange(e)} rows={3} required></textarea>
          <span className="focus-input100"></span>
					<span className="label-input100">Publicación</span>
          </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn btn-danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="btn btn-primary" onClick={onSubmit}>
            Publicar
          </Button>
        </Modal.Footer>
      </Modal>
      </Fragment>
    )
}

PostForm.propTypes = {
addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm)
