import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Movies.css'
import NavBar from "./CustomNavBar";
import {Badge, Layout, Menu } from "antd";

const { Header, Footer, Content } = Layout;

const Movies = props => {

    return (
        <Layout className="movie-container">
            <Header className="movie-header">
                <div>
                    <Menu mode="horizontal" className="movie-navbar">
                        <Menu.Item >
                            <img className="movie-logo" src={require("../Assets/Movies-black.svg")} alt="Movies" onClick={() => props.history.push('home')} />
                            <span className="movie-navbar-title">Peliculas</span>
                        </Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content className="content">

            </Content>
            <Footer className="footer">
            </Footer>
        </Layout>
    )

};

export default withRouter(Movies);