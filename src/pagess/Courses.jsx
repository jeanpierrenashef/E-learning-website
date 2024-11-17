import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";
import "../styles/Courses.css";

const Courses = () => {
    const navigate = useNavigate();
    const [Courses, setCourses] = useState([]);
    const [Enroll, setEnroll] = useState([]);
    const [UpdatedInput, setUpdatedInput] = useState([]);
    const user_id = localStorage.getItem("user_id");

    const loadCourses = async () => {
        const response = await axios.get(
        "http://localhost/AI-Movie-Recommender/server-side/getAllMovies_TEST.php"
        );
        setCourses(response.data.movies);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const isEnrolled = async () => {
        const data = new FormData();
        data.append("user_id", user_id);

        const response = await axios(
            "http://localhost/AI-Movie-Recommender/server-side/checkBookmark_TEST.php",{
                method:"POST",
                data:data,
            }
        )
        setEnroll(response.data.users);
        //console.log(response.data.users);
    }
    useEffect(() => {
        isEnrolled();
    }, []);

    const mergeEnrolledWithCourses = () => { //checks if the student enrolled in the courses that are displayed
        const updatedCourses = Courses.map((course) => {
        const isEnrolled = Enroll.some((enroll) =>
            enroll.movie_id === course.movie_id);
        return {
            ...course,
            isEnrolled,
        };
        });
        setUpdatedInput(updatedCourses);
    }; //i could have just used an api instead of all this
    useEffect(()=>{
        mergeEnrolledWithCourses()
    },[Courses, Enroll])

    console.log("Updated Courses:", UpdatedInput);
    return (
        <div className="courses">
            <h1>Courses</h1>
            <div>
                {UpdatedInput.map((movie) => (
                    <CourseCard movie={movie} key={movie.movie_id} />
                ))}

            </div>
        </div>
    );
    };

    export default Courses;
