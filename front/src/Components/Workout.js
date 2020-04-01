import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Workout.css'
import {Layout, Menu} from "antd";

const { Header, Footer, Content } = Layout;

const Workout = props => {

    return (
        <Layout className="workout-container">
            <Header className="workout-header">
                <div>
                    <Menu mode="horizontal" className="workout-navbar">
                        <Menu.Item >
                            <img className="workout-logo" src={require("../Assets/Workout-white.svg")} alt="Movies" onClick={() => props.history.push('home')} />
                            <span className="workout-navbar-title">Rutinas de ejercicio</span>
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

export default withRouter(Workout);