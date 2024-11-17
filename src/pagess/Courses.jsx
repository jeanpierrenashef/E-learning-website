    import React, { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    import axios from "axios";
    import CourseCard from "../components/CourseCard.jsx";
    import "../styles/Courses.css";

    const Courses = () => {
    const navigate = useNavigate();
    const [Courses, setCourses] = useState([]);

    const loadCourses = async () => {
        const response = await axios.get(
        "http://localhost/AI-Movie-Recommender/server-side/getAllMovies_TEST.php"
        );
        setCourses(response.data.movies);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="courses">
        <h1>Courses</h1>
        <div>
            {Courses.map((movie) => (
                <CourseCard movie={movie} key={movie.title} />
            ))}
        </div>
        </div>
    );
    };

    export default Courses;
