import React, { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import "../Styles/HomePage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from 'antd';

const HomePage = props => {
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
                        <img className = "heading-container-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('series')} />
                    </div>
            </div>
            <Container fluid>
                <Row className="justify-content-md-center space">
                    <Col>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large" onClick={() => props.history.push('movies')}>Entretenimiento</Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large" onClick={() => props.history.push('perfil')}>Mi lista</Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large" onClick={() => props.history.push('workout')}>Ejercicio</Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large space">Foro</Button>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row className="justify-content-md-center space">
                    <Col offset={2} xs={8}>
                        <div className="home-page-heading-text space">
                            <p>
                                DASURE plataforma web para recomendar series, películas, libros y rutinas de ejercicio.
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>

                    </Col>
                </Row>
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
            <Container fluid>
                <Row>
                    <Col xs={6}>
                        <div className="content-container space">
                            <p className="heading-text space">
                                Mision: DASURE es una plataforma para para recomendar series, películas, libros y rutinas de ejercicio.
                            </p>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="section-background-image-mission space">
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <div className="section-background-image-vision space">
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className="section-content space">
                            <div className="content-container space">
                                <p className="heading-text space">
                                    Mision: COVID-19Web Page es una plataforma para para recomendar series, películas, libros y rutinas de ejercicio.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center space">
                    <Col offset={2} xs={8}>
                        <div className="home-page-heading-text space">
                            <h2>
                                SÍGUENOS EN
                            </h2>
                        </div>

                    </Col>
                </Row>
                <Row className="justify-content-md-center space">
                    <Col>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large space">Instagram</Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large space">Facebook</Button>
                    </Col>
                    <Col xs={2}>
                        <Button className="home-page-button" size="large space">Pinterest</Button>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <div className="home-page-final-section">
                    <Row className="justify-content-md-center">

                    </Row>
                    <Row className="justify-content-md-center">
                        <img className = "heading-container-logo" src={require("../Assets/dasure-01.png")} alt="Series" onClick={() => props.history.push('series')} />
                    </Row>
                </div>
            </Container>
        </div>

    );
};
export default HomePage;