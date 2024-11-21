import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/CourseDetails.css"

const TeacherCourseDetails = () =>{
    const {title} = useParams();
    const [courseDetails, setCourseDetails] = useState([]);
    const [enrolled, setEnrolled] = useState([]);

    const [assignment, setAssignment] = useState("");

    const { course_id, genre, release_year, details } = courseDetails;

    const loadCourseDetails = () => {
        axios
        .get(
            `http://localhost/server-side-e-learning/server-side/getCourseDetails.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            setCourseDetails(response.data.response);
        }).catch(() => {console.log("error")});
    };
    
    useEffect(() => {
        loadCourseDetails();
    }, [title]);
    
    const getAllStudents = () => {
        const data = new FormData();
        data.append("course_id", course_id);
        axios("http://localhost/server-side-e-learning/server-side/getAllStudents.php",{
            method: "POST",
            data:data,
        })//gets al the students wether enrolled or no
        .then((response)=>{
            setEnrolled(response.data.users)
            console.log(response.data.users)
        }).catch(()=>{
            console.log("error fetching all students")
        })
    }
    useEffect(()=>{
        getAllStudents();
    },[course_id])

    const loadComments = () => {
        const data = new FormData();
        data.append("course_id", course_id);
        axios
            .post(
                "http://localhost/server-side-e-learning/server-side/getAllComments.php",
                data
            )
            .then((response) => {
                setComments(response.data.comments);
            })
            .catch(() => {
                console.log("Error fetching comments");
            });
    };

    useEffect(() => {
        if (course_id) {
            loadComments();
        }
    }, [course_id]);
    if (error) {
        return <p>Error loading course details. Please try again later.</p>;
    }

    if (!courseDetails) {
        return <p>Loading...</p>;
    }
    return(
        <div className="course-details">
            <h2>{title}</h2>
            <h3>Genre: {genre}</h3>
            <h3>Release Year: {release_year}</h3>
            <p>{details}</p>
            <h2>Students Enrolled:</h2>
            <div>
                {enrolled?.map((u)=>{
                    const isEnrolled = u.enrollment_status === "Enrolled";
                    return(
                    <div key={u.user_id} className="student-enroll">
                        <p>{u.user_id}:{u.username} ---- {isEnrolled ? "Enrolled" : "Not Enrolled"}</p>
                        {!isEnrolled &&  (
                            <button onClick={()=>{
                                const data = new FormData();
                                data.append("user_id", u.user_id);
                                data.append("course_id", course_id)
                                axios("http://localhost/server-side-e-learning/server-side/insertToEnroll.php",{
                                    method:"POST",
                                    data:data,
                                }).then(()=>{
                                    getAllStudents();
                                    console.log("invited",u.user_id, "to course")
                                }).catch(()=>{
                                    console.log("failed to invite")
                                })
                            }}
                            
                            >Invite</button>
                        
                        )}
                        
                    </div>
                    );
            })}
            </div>
            <h2>Comments:</h2>
            <div className="comment-output">
                {comments.map((c) => (
                    <div key={c.user_id}>
                        <p>
                            {c.username}:{c.comment_type === 0 ? "Public" : "Private"}-----{c.comment}
                        </p>
                    </div>
                ))}
            </div>
            <h2>Assign an Assignment:</h2>
            <div>
                <input type="text" placeholder="Assignment name" value={assignment} 
                    onChange={(e) => setAssignment(e.target.value)} 
                />
                <button onClick={() => {
                    const data = new FormData();
                    data.append("course_id", course_id);
                    data.append("assignment_name", assignment);
                    axios("http://localhost/server-side-e-learning/server-side/insertAssignment.php", {
                        method: "POST",
                        data: data,
                    }).then(() => {
                        console.log("Assignment added");
                        setAssignment(""); 
                    }).catch(() => {
                        console.log("Error adding assignment");
                    });
                }}>
                    Assign
                </button>
            </div>
        </div>
    )

    
}
export default TeacherCourseDetails;