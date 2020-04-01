import React from 'react'
import '../Styles/NavBar.css'
import {Menu, Badge, Input} from 'antd';
import { withRouter } from 'react-router-dom'

const NavBar = props => {

    const logout = () => {
        props.history.push("/")
    };

    return (
        <div className="menu-container">
            <Menu mode="horizontal">
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/Movies.svg")} alt="Movies" onClick={() => props.history.push('movies')} />
                </Menu.Item>
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/Series.svg")} alt="Series" onClick={() => props.history.push('series')} />
                </Menu.Item>
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/Books.svg")} alt="Books" onClick={() => props.history.push('books')} />
                </Menu.Item>
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/Workout.svg")} alt="Workout" onClick={() => props.history.push('workout')} />
                </Menu.Item>

                <Menu.Item>
                    <Badge count={5}> <img className = "navbar-logo-user" src={require("../Assets/icon.png")} alt="Notifications" onClick={() => props.history.push('/')}/> </Badge>
                </Menu.Item>

            </Menu>
        </div>
    );

};

export default withRouter(NavBar);
