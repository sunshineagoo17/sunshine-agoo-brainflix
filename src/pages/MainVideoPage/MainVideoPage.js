import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./MainVideoPage.scss";

import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

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

const MainVideoPage = ({ axiosInstance }) => {
    const { videoId } = useParams();
    const navigate = useNavigate();
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to update the main video data
    const updateMainVideo = useCallback(async (videoId) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.get(`/videos/${videoId}`);
            setMainVideo(response.data);
        } catch (error) {
            console.error("Error fetching main video details:", error);
            navigate("/uh-oh");
        } finally {
            setIsLoading(false);
        }
    }, [navigate, axiosInstance]);

    const fetchData = useCallback(async () => {
        try {
            const response = await axiosInstance.get("/videos");
            setVideos(response.data);
            if (videoId) {
                updateMainVideo(videoId);
            } else if (response.data.length > 0) {
                updateMainVideo(response.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching videos:", error.response || error);
        } finally {
            setIsLoading(false);
        }
    }, [axiosInstance, videoId, updateMainVideo]);  

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleVideoSelect = (videoId) => {
        updateMainVideo(videoId);
    };

    // Post a new comment and log the action
    const postComment = async (videoId, commentText, username) => {
        try {
            const commentPayload = { name: username, comment: commentText };
            const response = await axiosInstance.post(`/videos/${videoId}/comments`, commentPayload);
            
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
        console.log(`Attempting to delete comment with ID ${commentId} from video with ID ${videoId}`);
    
        try {
            const response = await axiosInstance.delete(`/videos/${videoId}/comments/${commentId}`);
            if (response.status === 204) { 
                console.log("Comment deleted successfully");
                setMainVideo(prevMainVideo => ({
                    ...prevMainVideo,
                    comments: prevMainVideo.comments.filter(comment => comment.id !== commentId)
                }));
            }
        } catch (error) {
            console.error("Sorry, we can't delete that comment:", error);
        }
    };

    // Function to handle liking a video
    const handleLikeVideo = async () => {
        try {
            const response = await axiosInstance.put(`/videos/${mainVideo.id}/likes`);
            if (response.status === 200) {
                setMainVideo(prevMainVideo => ({
                    ...prevMainVideo,
                    likes: response.data.likes.toString() 
                }));
            }
        } catch (error) {
            console.error("Failed to like comment:", error);
        }
    };

    // Function to handle video views
    const handleVideoViews = async () => {
        try {
            const response = await axiosInstance.put(`/videos/${mainVideo.id}/views`);
            if (response.status === 200) {
                // Ensure that the views count is updated by fetching the updated video data
                const updatedVideoResponse = await axiosInstance.get(`/videos/${mainVideo.id}`);
                if (updatedVideoResponse.status === 200) {
                    setMainVideo(updatedVideoResponse.data);
                }
            }
        } catch (error) {
            console.error("Failed to update views count:", error);
        }
    };    

    const handleLikeComment = async (videoId, commentId) => {
        try {
            const response = await axios.put(`/videos/${videoId}/comments/${commentId}/likes`);
            if (response.status === 200) {
                setMainVideo(prevMainVideo => {
                    const updatedComments = prevMainVideo.comments.map(comment => 
                        comment.id === commentId ? { ...comment, likes: response.data.likes } : comment);
                    return { ...prevMainVideo, comments: updatedComments };
                });
            }
        } catch (error) {
            console.error("Failed to like the comment:", error);
        }
    };

    return (
        <>
            {isLoading ? <Loader /> : (
                <div className="mainVideoPage"> 
                    {mainVideo && (
                        <div className="mainVideoPage">
                            <Hero 
                                mainVideo={mainVideo}
                                handleVideoViews={handleVideoViews}
                            />
                            <div className="mainVideoPage__video-info-container">
                                <div className="mainVideoPage__video-info-text">
                                    <VideoInfo
                                        mainVideo={mainVideo}
                                        TimeAgo={TimeAgo} 
                                        handleLikeVideo={handleLikeVideo}
                                        handleVideoViews={handleVideoViews}
                                    />
                                    <Comments
                                        comments={mainVideo?.comments || []}
                                        postComment={postComment}
                                        deleteComment={deleteComment}
                                        mainVideo={mainVideo}
                                        TimeAgo={TimeAgo}
                                        GenerateRandomUsername={GenerateRandomUsername}
                                        handleLikeComment={handleLikeComment}
                                    />
                                </div>
                                <div className="mainVideoPage__video-info-thumbnails-container">
                                    <div className="mainVideoPage__divider-container">
                                        <hr className="mainVideoPage__divider" />
                                    </div>
                                    <div className="mainVideoPage__video-info-thumbnails">
                                        <SideVideos videos={videos} mainVideo={mainVideo} onVideoSelect={handleVideoSelect} />
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