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

    const loadSeries = () => {
        fetch("/get/Series")
            .then(res => res.json())
            .then((result) => {
                console.log("bookeeeeees ", result);
                setSeries(result);

            });
    };

    const changeInfo = (name, img, description) => {
        setShowInfo({show: true, name: name,description:description,img:img});
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
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="series-container">

            <div className="series-header">
                <div className="series-header-navbar">
                    <img className = "series-header-navbar-logo" src={require("../Assets/dasure-02.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "series-header-hamburger" src={require("../Assets/menu.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="series-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "series-logo" src={require("../Assets/Series-white.svg")} alt="Series" onClick={() => props.history.push('/home')} />
                <div className="series-header-title">
                    <h1 className="series-header-title-text">
                        Series
                    </h1>
                </div>
            </div>
            <div onClick={() => {
                console.log("series ", series);
                console.log("showInfo ", showInfo);
            }}>
                click me
            </div>
            <Content className="content">
                <div className="container-series">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="persona-general">
                                <div className="persona-especifica">
                                    {series.map((m, id) => {
                                        let bg = m.Image;
                                        return (
                                            <div className="wrapper">
                                                <div className="cols">
                                                    <div className="col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="container" onClick={() => changeInfo(m.Name, m.Image, m.Description)}>
                                                            <div className="front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="inner">
                                                                </div>
                                                            </div>
                                                            <div className="back">
                                                                <div className="inner">
                                                                    <p className="title-inner">{m.Name}</p>
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

export default withRouter(Series);