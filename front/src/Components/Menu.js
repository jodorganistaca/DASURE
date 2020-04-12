import React from 'react'
import '../Styles/Menu.css'
import { withRouter } from 'react-router-dom'
const Menu = props => {

    const logout = () => {
        props.history.push("/")
    };

    return (
        <div className='menu-main-container'>
            <div className="menu-logo-user">
                <img onClick={() => props.history.push('/profile')} className="menu-img-logo" src={require('../Assets/icon.png')} alt="" />
            </div>
            <div className="menu-main-menu">
                <p onClick={() => props.history.push('/')}> Inicia sesión </p>
                <p onClick={() => props.history.push('/movies')}> Películas </p>
                <p onClick={() => props.history.push('/series')}> Series </p>
                <p onClick={() => props.history.push('/books')}> Libros </p>
                <p onClick={() => props.history.push('/workout')}> Ejercicio </p>
                <p onClick={() => props.history.push('/forum')}> Foro </p>
                <p onClick={logout}> Cerrar Sesión </p>
            </div>
        </div>


    )
};

export default withRouter(Menu)
