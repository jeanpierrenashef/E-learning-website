import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import axios from "axios";

const TeacherCourseCard = ({ test }) =>{
    const navigate = useNavigate();
    const { title} = test; 
    //const user_id = localStorage.getItem("user_id");
    return(
        <div className="course-card">
            <div className = "course-allign" >
                <h3 onClick={() => {
                navigate(`/teacher/${title}`);
            }}>{title}</h3>
            </div>

    </div>
    )
}
export default TeacherCourseCard;