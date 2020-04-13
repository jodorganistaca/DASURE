import React from 'react'
import '../Styles/Menu.css'
import { withRouter, Redirect } from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {logout} from "../actions/auth"
import { useHistory } from 'react-router-dom';
const Menu = ({auth}) => {
    let history = useHistory();
    

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                
                <img onClick={() => history.push('/profile')} className="menu-img-logo" src={auth && auth.user ? auth.user.photo : require('../Assets/icon.png')} alt="" />
            </div>
            <div className="menu-main-menu">
                {(!auth || auth.loading || !auth.user || !auth.user._id) &&
                <p onClick={() => history.push("/login")}> Inicia sesión </p>
                }
            <p onClick={() => history.push('/movies')}> Peliculas </p>
            <p onClick={() => history.push('/series')}> Series </p>
            <p onClick={() => history.push('/books')}> Libros </p>
            <p onClick={() => history.push('/workout')}> Ejercicio </p>
            <p onClick={() => history.push('/forum')}> Foro </p>
                {auth && !auth.loading && auth.user && auth.user._id &&
                <p onClick={logout}> Cerrar Sesión </p> }
            </div>
        </div>


    )
};

Menu.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default withRouter(connect(mapStateToProps, null)(Menu))
