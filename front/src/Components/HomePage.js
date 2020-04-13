import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import "../Styles/HomePage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from 'react-bootstrap';
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";
const HomePage = ({auth}) => {
    let history = useHistory();
    const [initialized, setInitialized] = useState(false);
    const [images, setImages] = useState([]);
    const [layers, setLayers] = useState([]);
    const loadImages = () => {
        const apiUrl = "https://pixabay.com/api";
        const ids = {
            Películas: '1975215',
            Series: '3774381',
            Libros: '3240766',
            Rutinas: '2959226',
            Ejercicio: '461195',
        };
        for (const [n, id] of Object.entries(ids)) {
            console.log(`id ${id} n ${n}`);
            fetch(`${apiUrl}/?key=${[process.env.REACT_APP_APIKEY]}`+"&id="+encodeURIComponent(id))
                .then(res => res.json())
                .then((result) => {
                    console.log(result);
                    setImages(images=>[...images,result.hits[0]]);
                    setLayers(layers=>[...layers,n]);
                });
        }
    };

    useEffect(() => {
        if (!initialized) {
            loadImages();
            setInitialized(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className="home-page">
            <div className="home-page-title-background space">
                    <div className="heading-container space">
                        <img className = "heading-container-logo" src={require("../Assets/dasure-01.png")}/>
                    </div>
            </div>
            <Container fluid id="section05">
                <Row className="justify-content-md-center space">
                    {(!auth || auth.loading || !auth.user || !auth.user._id) &&
                    <Col xs={2}>
                    <Button variant="" className="home-page-button" size="large" onClick={() => history.push('/login')}>Inicia sesión</Button>
                    </Col>}
                    <Col xs={2}>
                        <Button variant="" className="home-page-button" size="large" onClick={() => history.push('/movies')}>Películas</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="" className="home-page-button" size="large" onClick={() => history.push('/series')}>Series</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="" className="home-page-button" size="large" onClick={() => history.push('/workout')}>Ejercicio</Button>
                    </Col>
                    <Col xs={2}>
                        <Button variant="" className="home-page-button" size="large" onClick={() => history.push('/forum')} >Foro</Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center space">
                    <Col offset={2} xs={8}>
                        <div className="home-page-heading-text space">
                            <p style={{fontSize:"20px"}}>
                                DASURE plataforma web para recomendar series, películas, libros y rutinas de ejercicio. Aquí puedes ver qué actividades te gustan y participar en un foro para recomendarlas.
                            </p>
                        </div>

                    </Col>
                </Row>
                <span id="scrolldown-span"><p id="scrolldown-p"></p></span>
            </Container>

            {images.map((img, i) => {
                return (
                    <>
                        <Parallax className="space"
                            bgImage={img.largeImageURL}
                            bgImageAlt={img.tags}
                            strength={600}
                            renderLayer={percentage => (
                                <div>
                                    <div
                                        style={{
                                            position: "absolute",
                                            background: `rgba(255,255,255,0.9)`,
                                            left: "50%",
                                            top: "50%",
                                            borderRadius: "55%",
                                            transform: "translate(-50%,-50%)",
                                            width: percentage * 500,
                                            height: percentage * 500,
                                        }}
                                    />
                                </div>
                            )}
                        >
                            <div style={{ height: 500 }}>
                                <div className="heading-container space">
                                    <h3>
                                        <span className="heading-text" onClick={() => console.log(layers)}>
                                            {layers[i]}
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </Parallax>
                    </>
                );
            })}
            <Container fluid style={{margin: "0 !important", padding: "0"}}>
                <Row>
                    <Col xs={6}>
                        <div className="section-background-image-vision space">
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="section-content space">
                            <div className="content-container space">
                                <p className="heading-text space" style={{textAlign: "justify", position: "relative", top: "-241px"}}>
                                    Misión: La plataforma DASURE fue creada con el propósito de brindar una aplicación web que permita sugerir actividades para hacer en casa dada la coyuntura del virus COVID-19.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="home-page-final-section">
                    <Row className="justify-content-md-center">

                    </Row>
                    <Row className="justify-content-md-center">
                        <img className = "heading-container-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => history.push('/series')} />
                    </Row>
                </div>
            </Container>
        </div>

    );
};

HomePage.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, null)(HomePage);