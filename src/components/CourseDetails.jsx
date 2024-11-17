    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";

    const CourseDetails = () => {
    const { title } = useParams(); // Extract `title` from the URL
    const [movieDetails, setMovieDetails] = useState(null);
    const [error, setError] = useState(false);

    const loadMovieDetails = () => {
        axios
        .get(
            `http://localhost/AI-Movie-Recommender/server-side/getMovieDetails_TEST.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            if (response.data.response) {
            setMovieDetails(response.data.response);
            } else {
            setError(true); 
            }
        })
        .catch((err) => {
            console.error("Error fetching movie details:", err.message);
            setError(true); 
        });
    };

    useEffect(() => {
        loadMovieDetails();
    }, [title]);

    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    const { genre, release_year, details } = movieDetails;

    return (
        <div className="course-details">
        <h2>{title}</h2>
        <h3>Genre: {genre}</h3>
        <h3>Release Year: {release_year}</h3>
        <p>{details}</p>
        </div>
    );
    };

    export default CourseDetails;
