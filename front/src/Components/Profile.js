import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Profile.css'
import Menu from "./Menu";
import { Layout, Carousel, } from "antd";

const { Footer, Content } = Layout;

const Profile = props => {
    const [initialized, setInitialized] = useState(false);
    const [profile, setProfile] = useState({
        name: "UserX",
        photo: require('../Assets/icon.png'),
        likedMovies: [],
        likedSeries: [],
        likedBooks: [],
        likedActivities: [],
    });
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
    });

    const loadProfile = () => {
        fetch("/getProfile")
            .then(res => res.json())
            .then((result) => {
                console.log("Profileeeeeees ", result);
                setProfile(result);
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
            loadProfile();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="profile-container">

            <div className="profile-header">
                <div className="profile-header-navbar space">
                    <img className = "profile-header-navbar-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "profile-header-hamburger" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="home-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "profile-logo" src={profile.photo} alt="profile" onClick={() => props.history.push('/profile')} />
                <div className="profile-header-title">
                    <h1 className="profile-header-title-text">
                        {profile.name}
                    </h1>
                </div>
            </div>
            <Content className="content-profile">
                <div className="container-profile">
                    <Carousel className="profile-carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="profile-general">
                                <div className="profile-specific">
                                    <ul>
                                    <li style={{fontWeight:"bold" }} >Peliculas</li>
                                    {profile.likedMovies !== undefined && profile.likedMovies.length > 0 && profile.likedMovies.map((result, index) => {

                                        return (
                                            <li>{result.name}</li>
                                        )
                                    })}
                                    </ul>
                                    <ul>
                                        <li style={{fontWeight:"bold" }}>Series</li>
                                        {profile.likedSeries !== undefined && profile.likedSeries.length > 0 && profile.likedSeries.map((result, index) => {
                                            return (
                                                <li>{result.name}</li>
                                            )
                                        })}
                                    </ul>
                                    <ul>
                                        <li style={{fontWeight:"bold" }}>Libros</li>
                                        {profile.likedBooks !== undefined && profile.likedBooks.length > 0 && profile.likedBooks.map((result, index) => {
                                            return (
                                                <li>{result.name}</li>
                                            )
                                        })}
                                    </ul>
                                    <ul>
                                        <li style={{fontWeight:"bold" }}>Rutinas</li>
                                        {profile.likedActivities !== undefined && profile.likedActivities.length > 0 && profile.likedActivities.map((result, index) => {
                                            return (
                                                <li>{result.name}</li>
                                            )
                                        })}
                                    </ul>
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

export default withRouter(Profile);