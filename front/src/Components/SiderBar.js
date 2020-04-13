import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import { Layout } from 'antd';
import '../Styles/SiderBar.css'

const SideBar = props => {

    const  logout = () => {
      console.log("aca debe hacer logout");
    };

    return(
        <div className="sidebar-container">
            <div className="sidebar-logo-user">
                <img className="sidebar-img-logo" src={require('../Assets/icon.png')} alt="" />
            </div>

            <div className="sidebar-options">
                <p onClick={() => props.history.push('movies')}> Películas </p>
                <p onClick={() => props.history.push('series')}> Series </p>
                <p onClick={() => props.history.push('books')}> libros </p>
                <p onClick={() => props.history.push('workout')}> Rutinas </p>
                <p onClick={() => props.history.push('forum')}> Mis Foros </p>
                <p onClick={logout}> Cerrar Sesión </p>
            </div>
        </div>
    )

};

export default withRouter(SideBar)