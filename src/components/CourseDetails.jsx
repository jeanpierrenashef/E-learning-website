import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/CourseDetails.css"

const CourseDetails = () => {
    const { title } = useParams(); 
    const [courseDetails, setCourseDetails] = useState([]);
    const [error, setError] = useState(false);
    const [comment, setComment] = useState("");
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [readComments, setReadComments] = useState([]);
    const [commentSubmitted, setCommentSubmitted] = useState(false);
    const [assignments, setAssignments] = useState([]);
    const [assignmentFile, setAssignmentFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState("");

    const { course_id, genre, release_year, details } = courseDetails;

    const loadCourseDetails = () => {
        axios
        .get(
            `http://localhost/server-side-e-learning/server-side/getCourseDetails.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            if (response.data.response) {
            setCourseDetails(response.data.response);
            console.log(response.data.response)
            } else {
            setError(true); 
            }
        })
        .catch((err) => {
            console.error("Error fetching course details:", err.message);
            setError(true); 
        });
    };

    useEffect(() => {
        loadCourseDetails();
    }, [title]);

    const loadAssignments = () => {
        const data = new FormData();
        data.append("course_id",course_id)
        axios(`http://localhost/server-side-e-learning/server-side/getAssignments.php`,{
            method:"POST",
            data:data,
        })
        .then((response) => {
            setAssignments(response.data.assignments);
            //console.log(response.data.assignments)
        })
        .catch(() => console.log("Error fetching assignments."));
    };

    useEffect(() => {
        loadAssignments();
    }, [course_id]);

    const loadEnrolled = () => {
        const data = new FormData();
        data.append("course_id", course_id);

        axios("http://localhost/server-side-e-learning/server-side/checkifEnroll.php",{
            method:"POST",
            data:data,
            headers:{
                Authorization: localStorage.token
            }
        }).then((response)=>{
            if(response.data.status === true){
                setIsEnrolled(true);
            }else{
                setIsEnrolled(false);
            }
        }).catch(()=>console.log("error checking if enrolled"))
    }

    useEffect(() => {
        if (course_id) {
            loadEnrolled();
        }
    }, [course_id]);

    const loadComments = () => {
        const data = new FormData();
        data.append("course_id", course_id);
        axios("http://localhost/server-side-e-learning/server-side/getCommentsPublic.php",{
            method:"POST",
            data:data
        }).then((response)=>{
            console.log(response.data.comments);
            setReadComments(response.data.comments);
        }).catch(()=>console.log("error loading comments"))
    }

    useEffect(()=>{
        loadComments();
    },[course_id, commentSubmitted])

    const handleFileUpload = (e) => {
        setAssignmentFile(e.target.files[0]);
    };

    const submitAssignment = (assignmentId) => {
        if (!assignmentFile) {
            setUploadStatus("Please select a file to upload.");
            return;
        }

        const data = new FormData();
        data.append("file", assignmentFile);
        data.append("course_id", course_id);
        data.append("assignment_id", assignmentId);

        axios("http://localhost/server-side-e-learning/server-side/submitAssignment.php", {
            method: "POST",
            data: data,
            headers: {
                Authorization: localStorage.token,
                "Content-Type": "multipart/form-data"
            }
        })
        .then(() => {
            setUploadStatus("File uploaded successfully!");
        })
        .catch(() => {
            setUploadStatus("Error uploading file.");
        });
    };

    if (error) {
        return <p>Error loading course details. Please try again later.</p>;
    }

    if (!courseDetails) {
        return <p>Loading...</p>;
    }

    console.log(isEnrolled)
    return (
        <div className="course-details">
            <h2>{title}</h2>
            <h3>Genre: {genre}</h3>
            <h3>Release Year: {release_year}</h3>
            <p>{details}</p>
            {isEnrolled && (
                <>
            <div className="comment-section">
                <div className="comment-input">
                    <input type="text" placeholder="Comment" value={comment} onChange={(e)=>{
                        setComment(e.target.value)
                    }}/>
                    <button onClick={()=>{
                        setCommentSubmitted(true);
                        const data = new FormData();
                        data.append("course_id", course_id);
                        data.append("comment", comment);

                        axios("http://localhost/server-side-e-learning/server-side/addPublicComment.php",{
                            method:"POST",
                            data:data,
                            headers:{
                                Authorization: localStorage.token
                            }
                        }).then(()=>{
                            setCommentSubmitted(false);
                            setComment("");
                        }).catch(()=>console.log("posting public comment failed"))
                    }}>Public</button>
                </div>
                <div className="comment-output">
                    { readComments?.map((e)=>(
                        <div key={e.user_id}>
                            <p>{e.username}:{e.comment}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="assignments-section">
                <h3>Assignments</h3>
                {assignments.map((assignment) => (
                    <div key={assignment.assignment_id} className="assignment-upload">
                        <h4>{assignment.assignment_name}</h4>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                        />
                        <button onClick={() => submitAssignment(assignment.assignment_id)}>Upload</button>
                    </div>
                ))}
                {uploadStatus && <p>{uploadStatus}</p>}
            </div>

            </>
            )}
        </div>
    );
};

export default CourseDetails;
