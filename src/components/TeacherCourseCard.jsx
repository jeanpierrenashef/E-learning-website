import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/CourseCard.css";

const TeacherCourseCard = ({movie}) =>{
    const { movie_id, title, isEnrolled} = movie;
    return(
        <div className="course-card">
        <div className = "course-allign" onClick={() => {
                //navigate(`/teacher/${title}`);
            }}>
            <h3 >{title}</h3>
        </div>

    </div>
    )
}
export default TeacherCourseCard;