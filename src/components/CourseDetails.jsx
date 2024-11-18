    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import axios from "axios";
    import "../styles/CourseDetails.css"
    
const CourseDetails = () => {
    const { title } = useParams(); 
    const [movieDetails, setMovieDetails] = useState([]);
    const [error, setError] = useState(false);
    const user_id = localStorage.getItem("user_id");
    const [comment, setComment] = useState("");
    const [isEnrolled, setIsEnrolled] = useState(false);
    useEffect(()=>{
        console.log(comment)
    },[comment])
    const { movie_id, genre, release_year, details } = movieDetails;

    const loadMovieDetails = () => {
        axios
        .get(
            `http://localhost/AI-Movie-Recommender/server-side/getMovieDetails_TEST.php?title=${encodeURIComponent(title)}`
        )
        .then((response) => {
            if (response.data.response) {
            setMovieDetails(response.data.response);
            } else {
            setError(true); 
            }
        })
        .catch((err) => {
            console.error("Error fetching movie details:", err.message);
            setError(true); 
        });
    };

    useEffect(() => {
        loadMovieDetails();
    }, [title]);

    

    const loadEnrolled = () => {
        const data = new FormData();
        data.append("user_id",user_id);
        data.append("movie_id", movie_id);

        axios("http://localhost/AI-Movie-Recommender/server-side/checkBookmark.php",{
            method:"POST",
            data:data
        }).then((response)=>{
            if(response.data.status === true){
                setIsEnrolled(true);
            }else{
                setIsEnrolled(false);
            }
        }).catch(()=>{
            console.log("error checking if enrolled")
        })
    }
    useEffect(()=>{
        loadEnrolled();
    },[movie_id])


    if (error) {
        return <p>Error loading movie details. Please try again later.</p>;
    }

    if (!movieDetails) {
        return <p>Loading...</p>;
    }

    
    return (
        <div className="course-details">
            <h2>{title}</h2>
            <h3>Genre: {genre}</h3>
            <h3>Release Year: {release_year}</h3>
            <p>{details}</p>
            {isEnrolled && (
                <>
            <div className="comment-section">
                <input type="text" placeholder="Comment" onChange={(e)=>{
                    setComment(e.target.value)
                }}/>
                <button onClick={()=>{
                    const data = new FormData();
                    data.append("user_id", user_id);
                    data.append("movie_id", movie_id);
                    data.append("comment", comment);

                    axios("http://localhost/AI-Movie-Recommender/server-side/addPublicComment_TEST.php",{
                        method:"POST",
                        data:data
                    }).then((response)=>{
                        console.log("public comment added")
                    }).catch(()=>{
                        console.log("posting public comment failed")
                    })
                }}>Public</button>
                <button onClick={()=>{
                    const data = new FormData();
                    data.append("user_id", user_id);
                    data.append("movie_id", movie_id);
                    data.append("comment", comment);

                    axios("http://localhost/AI-Movie-Recommender/server-side/addPrivateComment_TEST.php",{
                        method:"POST",
                        data:data
                    }).then((response)=>{
                        console.log("private comment added")
                    }).catch(()=>{
                        console.log("posting private comment failed")
                    })
                }}>Private</button>
            </div>
            </>
            )}
        </div>
    );
    };

    export default CourseDetails;
