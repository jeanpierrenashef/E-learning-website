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
    const [loadInstructors, setLoadInstructors] = useState([])
    const [selectInstructor, setSelectInstructor] = useState("");
    const [selectCourse, setSelectCourse] = useState("");

    const loadAllUsers = () => {
        axios("http://localhost/server-side-e-learning/server-side/getAllUsers.php",{
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
        "http://localhost/server-side-e-learning/server-side/getAllCourses.php"
        );
        setCourses(response.data.courses);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    const handleAddingCourse = (title) => {
        const data = new FormData();
        data.append("title", title);
        axios("http://localhost/server-side-e-learning/server-side/addCourse.php",{
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
        axios("http://localhost/server-side-e-learning/server-side/addInstructors.php",{
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

    const loadAllInstructors = () => {
        axios("http://localhost/server-side-e-learning/server-side/getAllInstructors.php",{
                method: "GET",
            }).then((response)=>{
                setLoadInstructors(response.data.users);
                
            }).catch(()=>{
                console.log("not fetching users correctly")
            })
        
    }
    useEffect(()=>{
        loadAllInstructors()
    },[])

    const handleAssigning = (instructorId, courseId) => {
        const data = new FormData();
        data.append("user_id",instructorId);
        data.append("course_id", courseId);
        axios("http://localhost/server-side-e-learning/server-side/assignInstructorsToCourses.php",{
            method:"POST",
            data:data,
        }).then((response)=>{
            console.log(response)
            setSelectCourse("");
            setSelectInstructor("")
        }).catch(()=>{
            console.log("error assigning")
        })
    }
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
                        <AdminCourseCard course={u} key={u.course_id} loadCourses={loadCourses}/>
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
            <div className="assigning">
                <div>
                    <p>Assign Instructor: </p>
                    <select value={selectInstructor} onChange={(e) => setSelectInstructor(e.target.value)}>
                        <option value="">Select Instructor</option>
                        {loadInstructors.map((u) => {
                            return (
                                <option key={u.user_id} value={u.user_id}>
                                    {u.username}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <p>To courses: </p>
                    <select value={selectCourse} onChange={(e)=>{
                        setSelectCourse(e.target.value)
                    }}>
                        <option value="">Select Course</option>
                        {courses.map((c)=>{
                            return(
                                <option key={c.course_id} value={c.course_id}>
                                    {c.title}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <button onClick={()=>{
                    handleAssigning(selectInstructor,selectCourse)
                }}>Assign Together</button>
            </div>

        </div>
    );
};


export default Admin;
