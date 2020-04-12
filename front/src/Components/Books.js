import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Books.css'
import Menu from "./Menu";
import {Layout, Carousel } from "antd";


const { Footer, Content } = Layout;

const Books = props => {
    const [initialized, setInitialized] = useState(false);
    const [books, setBooks] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
    });

    const loadBooks = () => {
        fetch("/get/Books")
            .then(res => res.json())
            .then((result) => {
                console.log("bookeeeeees ", result);
                setBooks(result);
            });
    };

    const changeInfo = (name, img, description) => {
        setShowInfo({show: true, name: name,description:description,img:img});
    };

    let flag = false;
    const ShowSideMenu = () => {

        var element = document.getElementById('menu');
        if(flag){
            element.style.transform = 'translate(15vw)';
        }else{
            element.style.transform = 'translate(-15vw)';
        }
        element.style.zIndex = '25';
        element.style.transition = 'transform 500ms';
        flag = !flag;
    };

    useEffect(() => {
        if (!initialized) {
            loadBooks();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="book-container">

            <div className="book-header">
                <div className="space book-header-navbar">
                    <img className = "book-header-navbar-logo" src={require("../Assets/dasure-02.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "book-header-hamburger" src={require("../Assets/menu.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="books-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "book-logo" src={require("../Assets/Books-black.svg")} alt="Books" onClick={() => props.history.push('/')} />
                <div className="book-header-title">
                    <h1 className="book-header-title-text">
                        Libros
                    </h1>
                </div>
            </div>
            <div onClick={() => {
                console.log("books ", books);
                console.log("showInfo ", showInfo);
            }}>
                click me
            </div>
            <Content className="content">
                <div className="container-books">
                    <Carousel className="book-carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="book-general">
                                <div className="book-specific">
                                    {books.map((m, id) => {
                                        let bg = m.image;
                                        return (
                                            <div className="book-wrapper">
                                                <div className="book-cols">
                                                    <div className="book-col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="book-layout-container" onClick={() => changeInfo(m.name, m.image, m.description)}>
                                                            <div className="book-front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="book-inner">
                                                                </div>
                                                            </div>
                                                            <div className="book-back">
                                                                <div className="book-inner">
                                                                    <p className="title-inner">{m.name}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
                {showInfo.show ?
                    (<div className={"white-container"}>
                            <div><button className={"button-close"} onClick={()=>setShowInfo({show: false})}> X</button></div>
                            <div className="container-master-single-person" id="person">
                                <div className="container-master-photo-single-person">
                                    <div className="container-photo-single-person">
                                        <img src={showInfo.img} alt={showInfo.name} className="img-single-person" />
                                    </div>
                                </div>
                                <div className="container-master-info-single-person">
                                    <p className="name-single-person">{showInfo.name}</p>
                                    <p className="description-single-person">{showInfo.description}</p>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <div />}
            </Content>
            <Footer className="footer">
            </Footer>
        </Layout>
    )

};

export default withRouter(Books);