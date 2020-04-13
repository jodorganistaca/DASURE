import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Series.css'
import Menu from "./Menu";
import {Layout, Carousel } from "antd";


const { Footer, Content } = Layout;

const Series = props => {
    const [initialized, setInitialized] = useState(false);
    const [series, setSeries] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
    });
    const [profile, setProfile] = useState({
        likedSeries: []
    });

    const loadSeries = () => {
        fetch("/get/Series")
            .then(res => res.json())
            .then((result) => {
                console.log("Serieeeeees ", result);
                setSeries(result);
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

    const likeSeries = async (id, _id) => {
        console.log("puuuuuuuuuut serieeeeeee ", id, " serie id ", _id);
        const response = await fetch(`/users/${id}/likedSeries/${_id}`,{
            method: "PUT",
        });
        //convert response to Json format
        const myJson = await response.json();
        console.log(myJson);
        setShowInfo({show: false});
    };

    var flag = false;
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
            loadSeries();
            loadProfile();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="series-container">

            <div className="series-header">
                <div className="space series-header-navbar">
                    <img className = "series-header-navbar-logo" src={require("../Assets/dasure-02.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "series-header-hamburger" src={require("../Assets/menu.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="series-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "series-logo" src={require("../Assets/Series-white.svg")} alt="Series" onClick={() => props.history.push('/')} />
                <div className="series-header-title">
                    <h1 className="series-header-title-text">
                        Series
                    </h1>
                </div>
            </div>
            <Content className="content">
                <div className="container-series">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="series-general">
                                <div className="serie-specific">
                                    {series.map((m, id) => {
                                        let bg = m.image;
                                        return (
                                            <div className="series-wrapper">
                                                <div className="series-cols">
                                                    <div className="series-col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="series-layout-container" onClick={() => changeInfo(m._id,m.name, m.image, m.description)}>
                                                            <div className="series-front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="series-inner">
                                                                </div>
                                                            </div>
                                                            <div className="series-back">
                                                                <div className="series-inner">
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
                    (<div className={"series-white-container"}>
                            <div><button className={"series-button-close"} onClick={()=>setShowInfo({show: false})}> X</button></div>
                            <div className="container-single-series" id="person">
                                <div className="container-single-poster-series">
                                    <div className="container-photo-single-series">
                                        <img src={showInfo.img} alt={showInfo.name} className="img-single-series" />
                                    </div>
                                </div>
                                <div className="container-info-single-series">
                                    <p className="name-single-series">{showInfo.name}</p>
                                    <p className="description-single-series">{showInfo.description}</p>
                                </div>
                            </div>
                            {
                                profile._id === undefined ?
                                    <div />
                                    :
                                    <div className="series-like-container">
                                        {
                                            profile.likedSeries !== undefined && profile.likedSeries.includes(showInfo._id) ?
                                                <div>
                                                    <img className="series-like-logo" src={require("../Assets/like.svg")} alt="Series" />
                                                    <p className="series-like-count">1</p>
                                                </div>

                                                :
                                                <div>
                                                    <img className = "series-like-logo" src={require("../Assets/like.svg")} alt="Series" onClick={() => likeSeries(profile._id,showInfo._id)} />
                                                </div>
                                        }
                                    </div>
                            }
                    </div>
                    )
                    :
                    <div />}
            </Content>
            <Footer className="series-footer">
            </Footer>
        </Layout>
    )

};

export default withRouter(Series);