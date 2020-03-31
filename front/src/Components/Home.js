import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import NavBar from "./NavBar.js";

const Home = props => {

    return(
    <Layout className="home-container">

        <NavBar className = "nav-web"></NavBar>
        <Header>

        </Header>
        <Content className="content">

        </Content>
        <Footer className="footer">
        </Footer>
    </Layout>
    )

};

export default withRouter(Home)