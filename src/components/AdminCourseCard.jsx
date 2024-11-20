import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const AdminCourseCard = ({course}) => {
    const {movie_id, title} = course;
    //const [courseState, setCourseState] = useState([]);
    //const [toggle, setToggle] = useState(movie_id ? "Remove" : "Add")

    const handleCourse = () => {
        const data = new FormData();
        data.append("movie_id", movie_id);
    
            axios("http://localhost/AI-Movie-Recommender/server-side/deleteMovie_TEST.php", {
                method: "POST",
                data: data,
            }).then(() => {
                //setToggle("Add");
            }).catch(() => {
                console.log("error removing");
            });
        } 
    

    return(
        <div className="ban-section">
            <p>
                {movie_id}: {title}
            </p>
            <button onClick=
            {handleCourse}>
                Remove
                </button>
        </div>
    );
}
export default AdminCourseCard;