import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { withRouter } from 'react-router-dom'
import '../Styles/Workout.css'
import Menu from "./Menu";
import { Layout, Carousel } from "antd";

const { Footer, Content } = Layout;

const Workout = props => {
    const [initialized, setInitialized] = useState(false);
    const [workout, setWorkout] = useState([]);
    const [showInfo, setShowInfo] = useState({
        show: false,
        name: "",
        description: "",
        img: "",
    });

    const loadWorkout = () => {
        fetch("/get/Workout")
            .then(res => res.json())
            .then((result) => {
                console.log("Movieeeeeees ", result);
                setWorkout(result);

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
            loadWorkout();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout className="workout-container">

            <div className="workout-header">
                <div className="workout-header-navbar">
                    <img className = "workout-header-navbar-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('/')} />
                    <img className = "workout-header-hamburger" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="home-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "workout-logo" src={require("../Assets/Workout-white.svg")} alt="Workout" onClick={() => props.history.push('/home')} />
                <div className="workout-header-title">
                    <h1 className="workout-header-title-text">
                        Ejercicio
                    </h1>
                </div>
            </div>
            <div onClick={() => {
                console.log("workout ", workout);
                console.log("showInfo ", showInfo);
            }}>
                click me
            </div>
            <Content className="content">
                <div className="container-workout">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="persona-general">
                                <div className="persona-especifica">
                                    {workout.map((m, id) => {
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

export default withRouter(Workout);