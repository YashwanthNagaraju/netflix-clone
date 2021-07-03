import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../request';
import '../styles/Banner.css'

const Banner = () => {
    const baseImageUrl = "https://image.tmdb.org/t/p/original/";

    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            const random = Math.floor(Math.random() * request.data.results.length - 1)
            setMovie(request.data.results[random]);
            return request;
        }
        fetchData();
    }, []);

    function truncate(str, textLimit) {
        return str ?.length > textLimit ? str.substr(0, textLimit - 1) + "..." : str;
    }

    // console.log(movie)
    return (
        <header className="banner"
            style={{
                backGroundSize: "cover",
                backgroundImage: `url(${baseImageUrl}${movie ?.backdrop_path})`,
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1 className="banner_title">{movie ?.title || movie ?.original_name || movie ?.name}</h1>
                <div className="banner_buttons_div">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie ?.overview, 200)}
                </h1>
            </div>
            <div className="banner_fadeBottom" />
        </header>
    )
}

export default Banner
