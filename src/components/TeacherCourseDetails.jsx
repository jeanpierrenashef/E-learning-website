import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/CourseDetails.css"

const TeacherCourseDetails = () =>{
    const {title} = useParams();
    const [movieDetails, setMovieDetails] = useState([]);
    const [enrolled, setEnrolled] = useState([]);

    const { movie_id, genre, release_year, details } = movieDetails;

    const loadMovieDetails = () => {
        axios
        .get(
            `http://localhost/AI-Movie-Recommender/server-side/getMovieDetails_TEST.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            setMovieDetails(response.data.response);
        }).catch(() => {console.log("error")});
    };
    
    useEffect(() => {
        loadMovieDetails();
    }, [title]);
    
    const getAllStudents = () => {
        const data = new FormData();
        data.append("movie_id", movie_id);
        axios("http://localhost/AI-Movie-Recommender/server-side/getAllStudents_TEST.php",{
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
    },[movie_id])

    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    if (!movieDetails) {
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
                                data.append("movie_id", movie_id)
                                axios("http://localhost/AI-Movie-Recommender/server-side/insertToBookmark_TEST.php",{
                                    method:"POST",
                                    data:data,
                                }).then(()=>{
                                    getAllStudents(); //REFRESH
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
        </div>
    )

    
}
export default TeacherCourseDetails;