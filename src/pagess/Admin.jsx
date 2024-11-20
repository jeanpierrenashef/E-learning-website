import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../styles/Admin.css";
import BanUserCard from "../components/BanUserCard";
import AdminCourseCard from "../components/AdminCourseCard";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [addCourse, setAddCourse] = useState("");
    const [addInstructors, setAddInstructors] = useState({
        username:"",
        password:""
    })

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
    
    const handleAddingInstructor = (instructorsName) => {
        const data = new FormData();
        data.append("username", instructorsName.username);
        data.append("password", instructorsName.password)
        axios("http://localhost/AI-Movie-Recommender/server-side/addInstructors_TEST.php",{
            method:"POST",
            data:data
    }).then(()=>{
        setAddInstructors({
            username:"",
            password:""
        })
        loadAllUsers();
    }).catch(()=>{
        console.log("failed to add isntructor account")
    })}


    return (
        <div className="admin">
            <div className="admin-display">
                <div>
                    <h2>All Users</h2>
                    {users.map((u)=>(
                        <BanUserCard user={u} key={u.user_id} />
                    ))}
                </div>
                <div>
                    <h2>All Courses</h2>
                    {courses.map((u)=>(
                        <AdminCourseCard course={u} key={u.movie_id} loadCourses={loadCourses}/>
                    ))}
                    <h4>Add Course:</h4>
                    <input
                        type="text"
                        placeholder="Add Course Name"
                        value={addCourse}
                        onChange={(e) => setAddCourse(e.target.value)}
                    />
                    <button onClick={() => handleAddingCourse(addCourse)}>Add Course</button>
                </div>
            </div>
            <div>
                <div className="admin-add-instructor">
                    <h2>Create Instructor</h2>
                    <input type="text" placeholder="Instructor's Name" value={addInstructors.username} onChange={(e)=>{
                        setAddInstructors({
                            ...addInstructors,
                            username: e.target.value,
                        })
                    }}/>
                    <input type="password" placeholder="Instructor's Password" value={addInstructors.password} onChange={(e)=>{
                        setAddInstructors({
                            ...addInstructors,
                            password: e.target.value,
                        })
                    }}/>
                    <button onClick={()=>{
                        handleAddingInstructor(addInstructors)
                    }}>Add Instructor
                    </button>
                </div>
            </div>

        </div>
    );
};


export default Admin;
