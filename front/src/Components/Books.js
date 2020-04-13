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
    const [profile, setProfile] = useState({
        likedBooks: []
    });

    const loadBooks = () => {
        fetch("/get/Books")
            .then(res => res.json())
            .then((result) => {
                console.log("bookeeeeees ", result);
                setBooks(result);
            });
    };

    const loadProfile = () => {
        fetch("/getProfile")
            .then(res => res.json())
            .then((result) => {
                console.log("Profileeeeeees ", result);
                setProfile(result);
            });
    };

    const changeInfo = (id, name, img, description) => {
        setShowInfo({_id: id, show: true, name: name,description:description,img:img});
    };

    const likeBooks = async (id, _id, name) => {
        console.log("puuuuuuuuuut Boooooooks ", id, " book id ", _id);
        const data = {
            "book":{
                "id": _id,
                "name": name
            }
        };
        console.log(data);
        const response = await fetch(`/users/${id}/likedBooks`,{
            method: "PUT",
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
        });
        //convert response to Json format
        const myJson = await response.json();
        console.log(myJson);
        setShowInfo({show: false});
    };

    let flag = false;
    const ShowSideMenu = () => {

        var element = document.getElementById('menu');
        if(flag){
            element.style.transform = 'translate(18vw)';
        }else{
            element.style.transform = 'translate(-18vw)';
        }
        element.style.zIndex = '25';
        element.style.transition = 'transform 500ms';
        flag = !flag;
    };

    useEffect(() => {
        if (!initialized) {
            loadBooks();
            loadProfile();
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
                                                        <div className="book-layout-container" onClick={() => changeInfo(m._id, m.name, m.image, m.description)}>
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
                    (<div className={"book-white-container"}>
                            <div><button className={"book-button-close"} onClick={()=>setShowInfo({show: false})}> X</button></div>
                            <div className="container-single-book" id="person">
                                <div className="container-single-poster-book">
                                    <div className="container-photo-single-book">
                                        <img src={showInfo.img} alt={showInfo.name} className="img-single-book" />
                                    </div>
                                </div>
                                <div className="container-info-single-book">
                                    <p className="name-single-book">{showInfo.name}</p>
                                    <p className="description-single-book">{showInfo.description}</p>
                                </div>
                            </div>
                            {
                                profile._id === undefined ?
                                    <div />
                                    :
                                    <div className="series-like-container">
                                        {
                                            profile.likedBooks.filter(data => (data.id == showInfo._id)).length > 0 ?
                                                <div>
                                                    <img className="series-like-logo" src={require("../Assets/like.svg")} alt="Series" />
                                                    <p className="series-like-count">1</p>
                                                </div>

                                                :
                                                <div>
                                                    <img className = "series-like-logo" src={require("../Assets/like.svg")} alt="Series" onClick={() => likeBooks(profile._id,showInfo._id,showInfo.name)} />
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    )
                    :
                    <div />}
            </Content>
            <Footer className="books-footer">
            </Footer>
        </Layout>
    )

};

export default withRouter(Books);