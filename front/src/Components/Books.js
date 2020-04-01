import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Book.css'
import {Layout, Menu} from "antd";

const { Header, Footer, Content } = Layout;

const Books = props => {

    return (
        <Layout className="books-container">
            <Header className="books-header">
                <div>
                    <Menu mode="horizontal" className="books-navbar">
                        <Menu.Item >
                            <img className="books-logo" src={require("../Assets/Books-black.svg")} alt="Books" onClick={() => props.history.push('home')} />
                            <span className="books-navbar-title">Libros</span>
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

export default withRouter(Books);