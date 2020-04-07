const axios = require("axios");
const apiUrl = "https://pixabay.com/api";
export const getPhotos = () =>
    axios.get(`${apiUrl}/?key=${[process.env.REACT_APP_APIKEY]}`);

export const getPhotosBySearch = (search_term) =>
    axios.get(`${apiUrl}/?key=${[process.env.REACT_APP_APIKEY]}`+"&q="+encodeURIComponent(search_term));

export const getPhotosById = (id) =>
    axios.get(`${apiUrl}/?key=${[process.env.REACT_APP_APIKEY]}`+"&id="+encodeURIComponent(id));

export const getPhotosByCategory = (category) =>
    axios.get(`${apiUrl}/?key=${[process.env.REACT_APP_APIKEY]}`+"&editors_choice=true&category="+encodeURIComponent(category));