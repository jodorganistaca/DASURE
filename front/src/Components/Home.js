import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Home.css'
import NavBar from "./NavBar.js";
import SiderBar from "./SiderBar";

const { Header, Footer, Content } = Layout;

const Home = props => {

    return(
    <Layout className="home-container">
        <Header>
            <NavBar className = "nav-web"></NavBar>
        </Header>
        <Content className="content">

        </Content>
        <Footer className="footer">
        </Footer>
    </Layout>
    )

};

export default withRouter(Home)