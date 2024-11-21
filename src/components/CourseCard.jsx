import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import axios from "axios";

const CourseCard = ({ movie }) => {
    const navigate = useNavigate();
    const { movie_id, title, isEnrolled} = movie;
    const [toggle, setToggle] = useState(isEnrolled ? "Drop" : "Enroll");
    //const user_id = localStorage.getItem("user_id");

    useEffect(() => {
        setToggle(isEnrolled ? "Drop" : "Enroll");
    }, [isEnrolled]);

    const handleToggle = async () => {
        const data = new FormData();
        data.append("movie_id", movie_id);

        try {
            if (toggle === "Enroll") {
                await axios({
                    url: "http://localhost/AI-Movie-Recommender/server-side/insertToBookmark_TEST.php",
                    method: "POST",
                    data: data,
                    headers: {
                        Authorization: localStorage.token, 
                    },
                });
                setToggle("Drop");
            } else {
                await axios({
                    url: "http://localhost/AI-Movie-Recommender/server-side/unBookmark_TEST.php",
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
