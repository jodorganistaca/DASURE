import React from 'react'
import '../Styles/Menu.css'
import { withRouter } from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {logout} from "../actions/auth"
const Menu = ({auth}) => {

    

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                
                <img onClick={() => window.location.replace('/profile')} className="menu-img-logo" src={auth && auth.user ? auth.user.photo : require('../Assets/icon.png')} alt="" />
            </div>
            <div className="menu-main-menu">
                {(!auth || auth.loading || !auth.user || !auth.user._id) &&
                <p onClick={() => window.location.replace("/login")}> Inicia sesión </p>
                }
                <p onClick={() => window.location.replace('/movies')}> Peliculas </p>
                <p onClick={() => window.location.replace('/series')}> Series </p>
                <p onClick={() => window.location.replace('/books')}> Libros </p>
                <p onClick={() => window.location.replace('/workout')}> Ejercicio </p>
                <p onClick={() => window.location.replace('/forum')}> Foro </p>
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
export default connect(mapStateToProps, null)(Menu)
