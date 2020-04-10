import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Movies.css'
import Menu from "./Menu";
import { Layout, Carousel, } from "antd";

const { Footer, Content } = Layout;

const Movies = props => {
    const [initialized, setInitialized] = useState(false);
    const [movies, setMovies] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
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
            loadMovies();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="movie-container">

            <div className="movie-header">
                <div className="movie-header-navbar">
                    <img className = "movie-header-navbar-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "movie-header-hamburger" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="home-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "movie-logo" src={require("../Assets/Movies-white.svg")} alt="Movies" onClick={() => props.history.push('/home')} />
                <div className="movie-header-title">
                    <h1 className="movie-header-title-text">
                        Peliculas
                    </h1>
                </div>
            </div>
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
                                                        <div className="container" onClick={() => changeInfo(m.name, m.image, m.description)}>
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
                    (<div className="white-container">
                            <div><button className={"button-close"} onClick={()=>setShowInfo({show: false})}>X</button></div>
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

export default withRouter(Movies);