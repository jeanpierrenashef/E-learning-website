import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TeacherCourseDetails = () =>{
    const {title} = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [enrolled, setEnrolled] = useState([]);

    const { movie_id, genre, release_year, details } = movieDetails;

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
    }, [movie_id, title]);
    
    const getAllStudents = () => {
        axios.get("http://localhost/AI-Movie-Recommender/server-side/getAllEnrolledStudents_TEST.php")
    }

    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

}