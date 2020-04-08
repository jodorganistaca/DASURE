import React, { useState, useEffect, useContext } from 'react'
import 'antd/dist/antd.css';
//import Context from '../GlobalState/context'
import { withRouter } from 'react-router-dom'
import '../Styles/Movies.css'
import NavBar from "./CustomNavBar";
import {Badge, Layout, Menu, Carousel } from "antd";

const { Header, Footer, Content } = Layout;

const Movies = props => {
    const [initialized, setInitialized] = useState(false);
    const [movies, setMovies] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
    });


    const loadMovies = () => {
        fetch("/get/Movies")
            .then(res => res.json())
            .then((result) => {
                console.log("Movieeeeeees ", result);
                setMovies(result);

            });
    };

    const changeInfo = (name, img, description) => {
        setShowInfo({show: true, name: name,description:description});
    };

    const consultores = [
        { name: "Cristian Mantilla", img: "stock", link: "#", description: "Systems and Computing Engineering student at the Universidad Nacional de Colombia and active partaker of the Colombian Collegiate Programming League (CCPL) and member of the Laboratorio de Investigación de Sistemas Inteligentes (LISI) UNAL" },
        { name: "Brayan Guevara", img: "stock", link: "#", description: "Estudiante de pregrado en Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia, con capacidad para programar en C++, Python y Java, conocimientos en bases de datos relacionales, HTML, CSS, JavaScript, y manejo de la API de Google Maps, Bootstrap y Phaser." },
        { name: "Jose Organista", img: "stock", link: "https://www.linkedin.com/in/jose-calderon-b6b096136/", description: "Actualmente trabajo como desarrollador el la facultad de Ciencias Economicas de la Universidad donde utilizo diferentes tecnologias como base de datos (mysql), desarrollo web (laravel, vue, html, css, JavaScript) entre otras" },
        { name: "Juan Pulido", img: "stock", link: "https://www.linkedin.com/in/jjpulidos/", description: "Systems and Computing Engineer Student, main interests are design and analysis of algorithms, data science, artificial intelligence and related fields like machine learning and deep learning." },
        { name: "Camilo Pulido", img: "stock", link: "https://www.linkedin.com/in/oscar-camilo-pulido-peña-2318b5146/", description: "Systems and Computer Engineer student, Universidad Nacional de Colombia. Main interests are design and analysis of  Algorithms, Artificial Intelligence, Mathematics, Graph Theory and Computer Science related fields." },
        { name: "Maria Alejandra Robayo", img: "stock", link: "#", description: "Systems and Computer Engineer student, Universidad Nacional de Colombia. Interested in Research, Artificial Intelligence, Cryptography and Data Security, Computer’s Science, Algorithms and Data Structures." }
    ];

    useEffect(() => {
        if (!initialized) {
            loadMovies();
            setInitialized(true);
        }
    });

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
            <div onClick={() => {
                console.log("movies ", movies);
                console.log("showInfo ", showInfo);
            }}>
                click me
            </div>
            <Content className="content">
                <div className="container-movies">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="persona-general">
                                <div className="persona-especifica">
                                    {movies.map((m, id) => {
                                        let bg = m.image;
                                        return (
                                            <div className="wrapper">
                                                <div className="cols">
                                                    <div className="col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="container" onClick={() => changeInfo(m.name, m.img, m.description)}>
                                                            <div className="front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="inner">
                                                                </div>
                                                            </div>
                                                            <div className="back">
                                                                <div className="inner">
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
                                        <img src={require(`../Assets/stock.jpg`)} alt={showInfo.name} className="img-single-person" />
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

export default withRouter(Movies);