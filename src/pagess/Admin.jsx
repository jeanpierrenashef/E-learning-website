import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Admin.css";
import BanUserCard from "../components/BanUserCard";
import AdminCourseCard from "../components/AdminCourseCard";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [addCourse, setAddCourse] = useState("")

    const loadAllUsers = () => {
        axios("http://localhost/AI-Movie-Recommender/server-side/getAllUsers_TEST.php",{
                method: "GET",
            }).then((response)=>{
                setUsers(response.data.response);
            }).catch(()=>{
                console.log("not fetching users correctly")
            })
        
    };

    useEffect(() => {
        loadAllUsers();
    }, []);

    const loadCourses = async () => {
        const response = await axios.get(
        "http://localhost/AI-Movie-Recommender/server-side/getAllMovies_TEST.php"
        );
        setCourses(response.data.movies);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleAddingCourse = (title) => {
        const data = new FormData();
        data.append("title", title);
        axios("http://localhost/AI-Movie-Recommender/server-side/addMovie_TEST.php",{
            method:"POST",
            data:data
        }).then(()=>{
            console.log("added new course")
            setAddCourse("");
            loadCourses();
        }).catch(()=>{
            console.log("error adding course")
        })
    }


    return (
        <div className="admin">
            <div>
                <h1>All Users</h1>
                {users.map((u)=>(
                    <BanUserCard user={u} key={u.user_id} />
                ))}
            </div>
            <div>
                <h1>All Courses</h1>
                {courses.map((u)=>(
                    <AdminCourseCard course={u} key={u.movie_id} />
                ))}
                <p>Add Course:</p>
                <input
                    type="text"
                    placeholder="Add Course Name"
                    value={addCourse}
                    onChange={(e) => setAddCourse(e.target.value)}
                />
                <button onClick={() => handleAddingCourse(addCourse)}>Add Course</button>
            </div>
        </div>
    );
};

export default Admin;
