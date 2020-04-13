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
    const [profile, setProfile] = useState({
        likedActivities: []
    });

    const loadWorkout = () => {
        fetch("/get/Workout")
            .then(res => res.json())
            .then((result) => {
                console.log("Movieeeeeees ", result);
                setWorkout(result);

            });
    };

    const loadProfile = () => {
        fetch("/getProfile")
            .then(res => res.json())
            .then((result) => {
                if (!result.likedActivities)
                result.likedActivities = [];
                setProfile(result);
            });
    };

    const changeInfo = (id, name, img, description) => {
        setShowInfo({_id: id, show: true, name: name,description:description,img:img});
    };

    const likeWorkout = async (id, _id, name) => {
        console.log("puuuuuuuuuut workouuuuut ", id, " movie id ", _id);
        const data = {
            "activity":{
                "id": _id,
                "name": name
            }
        };
        console.log(data);
        const response = await fetch(`/users/${id}/likedActivities`,{
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

    var flag = false;
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
            loadWorkout();
            loadProfile();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Layout className="workout-container">

            <div className="workout-header">
                <div className="space workout-header-navbar">
                    <img className = "workout-header-navbar-logo" src={require("../Assets/dasure-01.png")} alt="Workout" onClick={() => props.history.push('/')} />
                    <img className = "workout-header-hamburger" src={require("../Assets/menu-button.svg")} alt="Notificaciones" onClick={ShowSideMenu}/>
                    <div className="workout-menu-collapse" id="menu">
                        <Menu/>
                    </div>
                </div>
                <img className = "workout-logo" src={require("../Assets/Workout-white.svg")} alt="Workout" onClick={() => props.history.push('/')} />
                <div className="workout-header-title">
                    <h1 className="workout-header-title-text">
                        Ejercicio
                    </h1>
                </div>
            </div>
            <Content className="content">
                <div className="container-workout">
                    <Carousel className="carousel-general" autoplay autoplaySpeed="100" dotPosition="top">
                        <div>
                            <div className="workout-general">
                                <div className="workout-specific">
                                    {workout.map((m, id) => {
                                        let bg = m.image;
                                        return (
                                            <div className="workout-wrapper">
                                                <div className="workout-cols">
                                                    <div className="workout-col" onTouchStart="this.classList.toggle('hover');">
                                                        <div className="workout-layout-container" onClick={() => changeInfo(m._id, m.name, m.image, m.description)}>
                                                            <div className="workout-front"
                                                                 style={{ backgroundImage: `url(${bg}` }}>
                                                                <div className="workout-inner">
                                                                </div>
                                                            </div>
                                                            <div className="workout-back">
                                                                <div className="workout-inner">
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
                    (<div className="workout-white-container">
                            <div><button className={"workout-button-close"} onClick={()=>setShowInfo({show: false})}>X</button></div>
                            <div className="container-single-workout" id="person">
                                <div className="container-single-poster-workout">
                                    <div className="container-photo-single-workout">
                                        <img src={showInfo.img} alt={showInfo.name} className="img-single-workout" />
                                    </div>
                                </div>
                                <div className="container-info-single-workout">
                                    <p className="name-single-workout">{showInfo.name}</p>
                                    <p className="description-single-workout">{showInfo.description}</p>
                                </div>
                            </div>
                            {
                                profile._id === undefined ?
                                    <div />
                                    :
                                    <div className="workout-like-container">
                                        {
                                            profile.likedActivities.filter(data => (data.id == showInfo._id)).length > 0 ?
                                                <div>
                                                    <img className="workout-like-logo" src={require("../Assets/like.svg")} alt="Workout" />
                                                    <p className="workout-like-count">1</p>
                                                </div>

                                                :
                                                <div>
                                                    <img className = "workout-like-logo" src={require("../Assets/like.svg")} alt="Workout" onClick={() => likeWorkout(profile._id,showInfo._id,showInfo.name)} />
                                                </div>
                                        }
                                    </div>
                            }
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