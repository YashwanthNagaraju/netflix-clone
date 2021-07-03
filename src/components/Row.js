import React, { useState, useEffect } from 'react';
import axios from '../axios';
import "../styles/Row.css"
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer"

const Row = ({ title, fetchUrl, isLargeRow }) => {

    const baseImageUrl = "https://image.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    // console.log(movies);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie ?.name || movie ?.title || movie ?.original_name || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));

        }
    }
    return (
        <div className="row">
            <h2 className="row_title">{title}</h2>
            <div className="row_movies">
                {movies.map(movie => (
                    <img
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        src={`${baseImageUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl &&
                <YouTube videoId={trailerUrl} opts={opts} />
            }
        </div>
    )
};

export default Row