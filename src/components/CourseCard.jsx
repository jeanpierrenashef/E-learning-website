import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import "../styles/CourseCard.css";
import axios from "axios";

const CourseCard = ({ movie }) => {
    const navigate = useNavigate();
    const { movie_id, title, isEnrolled} = movie;
    const [toggle, setToggle] = useState(isEnrolled ? "Drop" : "Enroll");
    const user_id = localStorage.getItem("user_id");

    const handleToggle = async () => {
        const data = new FormData();
        data.append("user_id", user_id);
        data.append("movie_id", movie_id);

        if (toggle === "Enroll") {
            await axios("http://localhost/AI-Movie-Recommender/server-side/insertToBookmark_TEST.php", {
                method: "POST",
                data: data,
            }).then(() => {
                setToggle("Drop");
            }).catch(() => {
                console.log("error dropping");
            });
        } else {
            await axios("http://localhost/AI-Movie-Recommender/server-side/unBookmark_TEST.php", {
                method: "POST",
                data: data,
            }).then(() => {
                setToggle("Enroll");
            }).catch(() => {
                console.log("error enrolling");
            });
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
