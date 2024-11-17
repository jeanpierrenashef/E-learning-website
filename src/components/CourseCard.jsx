import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";

const CourseCard = ({ movie }) => {
    const navigate = useNavigate();
    const { movie_id, title, isEnrolled} = movie;
    const [toggle, setToggle] = useState(isEnrolled ? "Drop" : "Enroll");

    const handleToggle = () => {
        setToggle((prev) => (prev === "Drop" ? "Enroll" : "Drop")); // Toggle between "Drop" and "Enroll"
    };

    return (
        <div className="course-card">
            <div className = "course-allign"
                >
                <h3 onClick={() => {
                    navigate(`/courses/${title}`);
                }}>{title}</h3>

                <button onClick={handleToggle}>
                    {toggle.toString()}
                </button>

            </div>

        </div>
    );
    };

    export default CourseCard;
