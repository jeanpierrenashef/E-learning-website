import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";

const CourseCard = ({ movie }) => {
    const navigate = useNavigate();
    const { movie_id, title, isEnrolled} = movie;
    const [toggle, setToggle] = useState(false);


    return (
        <div
        className="course-card"
        onClick={() => {
            navigate(`/courses/${title}`);
        }}
        >
            <div className = "course-allign">
                <h3>{title}</h3>
                <h3>{isEnrolled ? "true" : "false"}</h3>
                
            </div>
        </div>
    );
    };

    export default CourseCard;
