import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Courses.css";
import TeacherCourseCard from "../components/TeacherCourseCard";
//import TeacherCourseDetails from "../components/TeacherCourseDetails";

const Teachers = () => {
    //const user_id = localStorage.getItem("user_id");
    const [Courses, setCourses] = useState([])

    const loadCourses = () => {
        const data = new FormData();
        //data.append("user_id", user_id)
        axios(
            "http://localhost/server-side-e-learning/server-side/getCourseDetailsTeacher.php",{
                method:"POST",
                data:data,
                headers:{
                    Authorization: localStorage.token,
                }
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

    console.log("Updated:", Courses);
    return(
        <div className="courses">
            <h1>Your Courses</h1>
            <div>
                {Courses.map((u) => (
                    <TeacherCourseCard test={u} key={u.movie_id}/>
                ))}

            </div>

        </div>
    );
};
export default Teachers;