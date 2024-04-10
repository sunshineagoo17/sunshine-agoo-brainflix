import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./MainVideoPage.scss";

import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

const baseURL = "https://project-2-api.herokuapp.com";
const axiosInstance = axios.create({ baseURL });

// Function that formats dynamic timestamp - used in Comments and VideoInfo components
const TimeAgo = (timestamp) => {
    const commentDate = new Date(timestamp);
    const now = new Date();
    const timeDifference = Math.floor((now - commentDate) / 1000);
  
    if (timeDifference < 60) return "Just now";
    if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)} minutes ago`;
    if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)} hours ago`;
    if (timeDifference < 2592000) return `${Math.floor(timeDifference / 86400)} days ago`;
    if (timeDifference < 31536000) return `${Math.floor(timeDifference / 2592000)} months ago`;
  
    return `${Math.floor(timeDifference / 31536000)} years ago`;
};

// Function that generates a random username for new comments posted
function GenerateRandomUsername() {
    const firstName = [ "Tamie", "Homer", "Ross", "Hugo", "Jack", "Tyrion", "Marge", "Winnie", "Dragon", "Penguin"];
    const lastName = [ "Revers", "Bear", "Geller", "Lannister", "Hammock", "Castle", "Russell", "Hannigan", "Simpson", "Awesome"];

    const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];

    return `${randomFirstName} ${randomLastName}`;
}

const MainVideoPage = () => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiKey, setApiKey] = useState("");

    // Fetch API key on component mount
    useEffect(() => {
        const fetchApiKey = async () => {
            try {
                const response = await axios.get(`${baseURL}/register`);
                setApiKey(response.data.api_key);
            } catch (error) {
                console.error("Error fetching API key:", error);
            }
        };
        fetchApiKey();
    }, []);

    // Function to update the main video data
    const updateMainVideo = useCallback(async (videoId) => {
        if (!apiKey) return;
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/videos/${videoId}`, { params: { api_key: apiKey } });
            setMainVideo(response.data);
        } catch (error) {
            console.error("Error fetching main video details:", error);
            navigate("/uh-oh");
        } finally {
            setIsLoading(false);
        }
    }, [apiKey, navigate]);

    useEffect(() => {
        if (!apiKey) return;
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/videos", { params: { api_key: apiKey } });
                setVideos(response.data);
                if(videoId) {
                    updateMainVideo(videoId);
                } else if(response.data.length > 0) {
                    updateMainVideo(response.data[0].id);
                }
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [apiKey, videoId, updateMainVideo]); 

    // Post a new comment and log the action
    const postComment = async (videoId, commentText, username) => {
        if (!apiKey) return;
        try {
            const commentPayload = { name: username, comment: commentText };
            const response = await axiosInstance.post(`/videos/${videoId}/comments`, commentPayload, {
                params: { api_key: apiKey }
            });
            
            if (response.data && mainVideo.id === videoId) {
                setMainVideo(prevMainVideo => ({
                    ...prevMainVideo,
                    comments: [response.data, ...prevMainVideo.comments]
                }));

                console.log(`Comment posted: Video ID: ${videoId}, Comment ID: ${response.data.id}`);
            }
            
            return { success: true, comment: response.data };
        } catch (error) {
            console.error("Failed to post comment:", error);
            return { success: false, message: error.message };
        }
    };    

    // Deletes a specific comment from a video
    const deleteComment = async (videoId, commentId) => {
        const updatedComments = mainVideo.comments.filter(comment => comment.id !== commentId);
        const previousComments = mainVideo.comments;

        setMainVideo(prevMainVideo => ({
            ...prevMainVideo,
            comments: updatedComments
        }));

        console.log(`Attempting to delete comment with ID ${commentId} from video with ID ${videoId}`);
        
        try {
            const response = await axiosInstance.delete(`/videos/${videoId}/comments/${commentId}`, { params: { api_key: apiKey } });
            console.log("Comment deleted successfully:", response.data);
        } catch (error) {
            console.error("Sorry, we can't delete that comment:", error);
            setMainVideo(prevMainVideo => ({
                ...prevMainVideo,
                comments: previousComments
            }))
        }
    };

    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="mainVideoPage"> 
                    {mainVideo && (
                        <div className="mainVideoPage">
                            <Hero mainVideo={mainVideo} />
                            <div className="mainVideoPage__video-info-container">
                                <div className="mainVideoPage__video-info-text">
                                    <VideoInfo
                                        mainVideo={mainVideo}
                                        TimeAgo={TimeAgo} 
                                    />
                                    <Comments
                                        comments={mainVideo?.comments || []}
                                        postComment={postComment}
                                        deleteComment={deleteComment}
                                        mainVideo={mainVideo}
                                        TimeAgo={TimeAgo}
                                        GenerateRandomUsername={GenerateRandomUsername}
                                    />
                                </div>
                                <div className="mainVideoPage__video-info-thumbnails-container">
                                    <div className="mainVideoPage__divider-container">
                                        <hr className="mainVideoPage__divider" />
                                    </div>
                                    <div className="mainVideoPage__video-info-thumbnails">
                                        <SideVideos videos={videos} mainVideo={mainVideo} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MainVideoPage;
