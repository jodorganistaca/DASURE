import React, { useState, useEffect } from "react";
import { Parallax, Background } from "react-parallax";
import "../Styles/HomePage.css";
import {getPhotos, getPhotosByCategory, getPhotosById, getPhotosBySearch, getSpecificPhotos} from "../Request/requests";

function HomePage() {
    const [initialized, setInitialized] = useState(false);
    const [images, setImages] = useState([]);
    const [layers, setLayers] = useState([]);
    const loadImages = () => {
        /*const series = await getPhotosById('3774381');
        const movies = await getPhotosById('1975215');

        const books = await getPhotosById('3240766');
        const workout1 = await getPhotosById('2959226');
        const workout2 = await getPhotosById('461195');
        const  response = await getPhotosBySearch("yellow flower");*/
        const apiUrl = "https://pixabay.com/api";
        const ids = {
            movies: '1975215',
            series: '3774381',
            books: '3240766',
            routines: '2959226',
            workout2: '461195',
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
    });
    return (
        <div className="home-page">
            {images.map((img, i) => {
                return (
                    <>
                        <Parallax
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
                                            borderRadius: "50%",
                                            transform: "translate(-50%,-50%)",
                                            width: percentage * 500,
                                            height: percentage * 500,
                                        }}
                                    />
                                </div>
                            )}
                        >
                            <div style={{ height: 500 }}>
                                <div className="heading-container">
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
            <div className="section-view">
                <div className="section-background">
                    <div className="section-background-image">
                    </div>
                </div>
                <div className="section-content">
                    <div className="section-content-view">
                        <div className="content-container">
                            <h4 className=" ">
                                <span className="heading-content-wrapper">
                                    <a
                                    className="page-heading-anchor" title="Copy anchor link"
                                    id="page-content-mision-covid-19web-page-es-una-plataforma-para-para-recomendar-series-peliculas-libros-y-rutinas-de-ejercicio"
                                    aria-hidden="true"
                                    href="#mision-covid-19web-page-es-una-plataforma-para-para-recomendar-series-peliculas-libros-y-rutinas-de-ejercicio"
                                    >

                                    </a>
                                    <span className="heading-text">
                                        Mision: COVID-19Web Page es una plataforma para para recomendar series, peliculas, libros y rutinas de ejercicio.
                                    </span>
                                </span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default HomePage;