import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Courses.css";
import TeacherCourseCard from "../components/TeacherCourseCard";

const Teachers = () => {
    const user_id = localStorage.getItem("user_id");
    const [Courses, setCourses] = useState([])

    const loadCourses = () => {
        const data = new FormData();
        data.append("user_id", user_id)
        axios(
            "http://localhost/AI-Movie-Recommender/server-side/getMovieDetails_TEST.php",{
                method:"POST",
                data:data,
            }).then((response)=>{
                console.log(response.data.response)
                setCourses(response.data.response)
                
            }).catch(()=>{
                console.log("error loading courses")
            })
    }
    useEffect(()=>{
        loadCourses();
    },[])
    return(
        <div className="courses">
            <h1>Your Courses</h1>
            <div>
                {Courses?.map((e)=>(
                    <TeacherCourseCard movie={e} key={e.movie_id}/>
                ))}

            </div>

        </div>
    )
}
export default Teachers;