import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Book.css'
import {Layout, Menu} from "antd";
import FormCreator from "./FormCreator";

const { Header, Footer, Content } = Layout;

const Books = props => {

    const [books, setBooks] = useState(null);

    useEffect(() => {
        console.log("get Books");
        fetch("http://localhost:3001/getBooks", { mode: 'no-cors'})
            .then(res => {
                res.json();
            })
            .then(books => {
                console.log(books);
                setBooks(books);
            });
    });

    const test = () => {
        console.log(books);
    };

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
                <span onClick={() => test()}>click me</span>

            </Content>
            <Footer className="footer">
            </Footer>
        </Layout>
    )

};

export default withRouter(Books);