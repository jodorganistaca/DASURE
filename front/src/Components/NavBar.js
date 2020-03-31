import React from 'react'
import '../Styles/NavBar.css'
import {Menu, Badge, Input} from 'antd';
import { withRouter } from 'react-router-dom'
import {Auth} from "aws-amplify";

const { Search } = Input;

const NavBar = props => {

    const logout = () => {
        Auth.signOut();
        props.history.push("/")
    };

    return (
        <div className="menu-container">
            <Menu mode="horizontal">
                <Menu.Item >
                    <img className = "logo" src={require("../Assets/Movies.svg")} alt="Notificaciones" onClick={() => props.history.push('home')} />
                </Menu.Item>
                <Menu.Item >
                    <img className = "footer-item" src={require("../Assets/Series.svg")} alt="Flashcards" onClick={() => props.history.push({pathname: 'decks', state: {decks_type : "owned"}})}/>
                </Menu.Item>
                <Menu.Item>
                    <img className = "footer-item" src={require("../Assets/Books.svg")} alt="Search" onClick={() => props.history.push('search-category')}/>
                </Menu.Item>
                <Menu.Item>
                    <Badge count={5}> <img className = "footer-item" src={require("../Assets/notification-white.svg")} alt="Notificaciones" onClick={() => props.history.push('questionnaires-list')}/> </Badge>
                </Menu.Item>
                <Menu.Item>
                    <img className = "footer-item" src={require("../Assets/logout.svg")} alt="Logout" onClick={logout}/>
                </Menu.Item>
                <Menu.Item className="search-menu">
                    <Search
                        placeholder="Busca una baraja..."
                        onSearch={value => console.log(value)}
                    />
                </Menu.Item>
            </Menu>
        </div>
    );

};

export default withRouter(NavBar);
