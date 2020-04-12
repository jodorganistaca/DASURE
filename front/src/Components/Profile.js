import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Profile.css'
import Menu from "./Menu";
import { Layout, Carousel, } from "antd";

const { Footer, Content } = Layout;

const Profile = props => {
    const [initialized, setInitialized] = useState(false);
    const [profile, setProfile] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
    });
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('batman');


    const loadProfile = () => {
        fetch("/get/Profile")
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
        setLoading(true);
        setError(null);
        setData(null);

        fetch(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.REACT_APP_OMDB_APIKEY}`)
            .then(resp => resp)
            .then(resp => resp.json())
            .then(response => {
                console.log(response);
                console.log(process.env.REACT_APP_OMDB_APIKEY);
                console.log(process.env.REACT_APP_APIKEY);
                console.log(`http://www.omdbapi.com/?s=${q}&apikey=${[process.env.REACT_APP_OMDB_APIKEY]}`);
                if (response.Response === 'False') {
                    setError(response.Error);
                }
                else {
                    setData(response.Search);
                }

                setLoading(false);
            })
            .catch(({message}) => {
                setError(message);
                setLoading(false);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [q]);

    return (
        <Layout className="profile-container">

            <div className="profile-header">
                <div className="profile-header-navbar">
                    <img className = "profile-header-navbar-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "profile-header-hamburger" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="home-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "profile-logo" src={require("../Assets/icon.png")} alt="profile" onClick={() => props.history.push('/profile')} />
                <div className="profile-header-title">
                    <h1 className="profile-header-title-text">
                        User x
                    </h1>
                </div>
            </div>
            <div onClick={() => {
                console.log("profile ", profile);
                console.log("showInfo ", showInfo);
            }}>
                click me
            </div>
            <Content className="content-profile">
                <div className="container-profile">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="persona-general">
                                <div className="persona-especifica">
                                    {profile.map((m, id) => {
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
                                <div className="persona-especifica">
                                    {data !== null && data.length > 0 && data.map((result, index) => {
                                        let bg = result.Poster;
                                        return (
                                            <div className="wrapper">
                                                <div className="cols">
                                                    <div className="col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="container" onClick={() => changeInfo(result.Title, result.Poster, result.Plot)}>
                                                            <div className="front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="inner">
                                                                </div>
                                                            </div>
                                                            <div className="back">
                                                                <div className="inner">
                                                                    <p className="title-inner">{result.Title}</p>
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

export default withRouter(Profile);