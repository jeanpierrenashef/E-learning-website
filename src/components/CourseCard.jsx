    import React from "react";
    import { useNavigate } from "react-router-dom";
    import "../styles/CourseCard.css";

    const CourseCard = ({ movie }) => {
    const navigate = useNavigate();
    const { movie_id, title } = movie;

    return (
        <div
        className="course-card"
        onClick={() => {
            navigate(`/courses/${title}`);
        }}
        >
        <h3>{title}</h3>
        </div>
    );
    };

    export default CourseCard;
