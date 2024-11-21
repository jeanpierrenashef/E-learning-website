import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/CourseCard.jsx";
import "../styles/Courses.css";

const Courses = () => {
    //const navigate = useNavigate();
    const [Courses, setCourses] = useState([]);
    const [Enroll, setEnroll] = useState([]);
    const [UpdatedInput, setUpdatedInput] = useState([]);
    //const user_id = localStorage.getItem("user_id");

    const loadCourses = async () => {
        const response = await axios.get(
        "http://localhost/server-side-e-learning/server-side/getAllCourses.php"
        );
        setCourses(response.data.courses);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const isEnrolled = async () => {
        // const data = new FormData();
        // data.append("user_id", user_id);
        try{
            const response = await axios.get(
                "http://localhost/server-side-e-learning/server-side/checkEnroll.php",{
                    headers:{
                        Authorization: localStorage.token,
                    },
                    //data:data,
                }
            );
            setEnroll(response.data.users);

        }catch(error){
            console.log(error)
        }
    }
    useEffect(() => {
        isEnrolled();
    }, []);

    const mergeEnrolledWithCourses = () => { //checks if the student enrolled in the courses that are displayed
        const updatedCourses = Courses.map((course) => {
        const isEnrolled = Enroll.some((enroll) =>
            enroll.course_id === course.course_id);
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
    console.log("Enrolled: ", Enroll)
    console.log("Updated Courses:", UpdatedInput);
    return (
        <div className="courses">
            <h1>Courses</h1>
            <div>
                {UpdatedInput.map((course) => (
                    <CourseCard course={course} key={course.course_id} />
                ))}

            </div>
        </div>
    );
    };

    export default Courses;
