import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import axios from "axios";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const { course_id, title, isEnrolled} = course;
    const [toggle, setToggle] = useState(isEnrolled ? "Drop" : "Enroll");
    //const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        setToggle(isEnrolled ? "Drop" : "Enroll");
    }, [isEnrolled]);

    const handleToggle = async () => {
        const data = new FormData();
        data.append("course_id", course_id);

        try {
            if (toggle === "Enroll") {
                await axios({
                    url: "http://localhost/server-side-e-learning/server-side/insertToEnroll.php",
                    method: "POST",
                    data: data,
                    headers: {
                        Authorization: localStorage.token, 
                    },
                });
                setToggle("Drop");
            } else {
                await axios({
                    url: "http://localhost/server-side-e-learning/server-side/unEnroll.php",
                    method: "POST",
                    data: data,
                    headers: {
                        Authorization: localStorage.token, 
                    },
                });
                setToggle("Enroll");
            }
        } catch (error) {
            console.error("Error toggling enrollment:", error);
        }
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
