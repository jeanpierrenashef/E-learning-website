import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "./components/CourseCard.jsx"

const Courses = () => {
const navigate = useNavigate();

const [toggle, setToggle] = useState(false);
const [Courses, setCourses] = useState([]);

const loadCourses = async () => {
    const response = await axios.get(
    "http://localhost/AI-Movie-Recommender/server-side/getAllMovies_TEST.php"
    );

    console.log(response.data);

    setCourses(response.data.movies);
};

useEffect(() => {
    loadCourses(); //so that the api isnt rendered everytime the page is rendered
}, []);

return (
    <div>
        <h1>Courses</h1>
    {/* <button
        onClick={() => {
        navigate("/", {});
        }}
    >
        Go to login
    </button> */}
        <button
            onClick={() => {
            setToggle(!toggle);
            }}
        >
            {toggle.toString()}
        </button>

        <div>
            {Courses?.map((u) => (
                <CourseCard arr={u} key={navigate.title} />
            // <div key={u.id}>
            //     <p>{u.username}</p>
            //     <p>{u.password}</p>
            //     <p>===============</p>
            // </div>
            ))}
        </div>
    </div>
);
};

export default Courses;
