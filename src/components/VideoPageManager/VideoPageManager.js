import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";

import "./VideoPageManager.scss";

// Define baseURL and initiate Axios instance
export const baseURL = "https://project-2-api.herokuapp.com";
export const axiosInstance = axios.create({ baseURL });

// Context for sharing video data across components
export const VideoContext = createContext();

// Custom hook for convenient context usage
export const useVideoData = () => useContext(VideoContext);

// Function that formats dynamic timestamp - used in Comments and VideoInfo components
export function TimeAgo(timestamp) {
    // Converts the timestamp to a date object for the comment date
    const commentDate = new Date(timestamp);
    // Gets the current date and time
    const now = new Date();

    // Calculates the time difference in seconds between the current time and the comment time
    const timeDifference = Math.floor((now - commentDate) / 1000);
    // Calculates the time difference 
    if (timeDifference < 60) return "Just now";
    if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)} minutes ago`;
    if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)} hours ago`;
    if (timeDifference < 2592000) return `${Math.floor(timeDifference / 86400)} days ago`;
    if (timeDifference < 31536000) return `${Math.floor(timeDifference / 2592000)} months ago`;

    // Calculates and formats the time difference in years and append "years ago"
    return `${Math.floor(timeDifference / 31536000)} years ago`;
}

// Function that generates a random username for new comments posted
export function GenerateRandomUsername() {
    const firstName = [ "Tamie", "Homer", "Ross", "Hugo", "Jack", "Tyrion", "Marge", "Winnie", "Dragon", "Penguin"];
    const lastName = [ "Revers", "Bear", "Geller", "Lannister", "Hammock", "Castle", "Russell", "Hannigan", "Simpson", "Awesome"];

    const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];

    // Combines a random first name and last name;
    return `${randomFirstName} ${randomLastName}`;
}

// Custom hook to fetch and store the API key needed for making requests to the backend
export const useAPIKey = () => {
    const [apiKey, setAPIKey] = useState("");

    // Fetch API key on component mount
    useEffect(() => {
        // Async function to fetch API key
        const fetchAPIKey = async () => {
            try {
                // Request API key
                const response = await axios.get(`${baseURL}/register`);
                // Set API key in state  
                setAPIKey(response.data.api_key);          
            } catch (error) {
                // Log fetch error
                console.error("Error fetching API key:", error);
            }
        };

        // Execute fetch function
        fetchAPIKey();
        // Empty dependency array - effect only runs once
    }, []);
    
    return apiKey;
};

export const useFetchVideoData = () => {
    // State for storing the list of videos and the currently selected main video
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    // Use custom hook to retrieve the API key needed for requests
    const apiKey = useAPIKey();

    // Fetch the lsit of videos once the component mounts or apiKey changes
    useEffect(() => {
        if (!apiKey) return; // Exit if apiKey is not available
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/videos", { params: { api_key: apiKey } });
                // Update state with the fetched video list of videos
                setVideos(response.data);
            } catch (error) {
                // Handle errors in fetching videos
                console.error("Error fetching videos:", error);
            }
        };
        
        fetchData();
    }, [apiKey]);

    // Update details of the main video, including sorting comments by newest first
    const updateMainVideo = useCallback(async (videoId) => {
    if (!apiKey) return;
        try {
            const response = await axiosInstance.get(`/videos/${videoId}`, { params: { api_key: apiKey } });
            // Sort comments from newest to oldest before setting the main video
            const sortedComments = response.data.comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setMainVideo({
                ...response.data,
                comments: sortedComments,
            });
        } catch (error) {
            // Handle errors in fetching main video details
            console.error("Error fetching main video details:", error);
        }
    }, [apiKey]);

    // Post a new comment and log the action
    const postComment = async (videoId, commentText, username) => {
        try {
            const commentPayload = { name: username, comment: commentText };
            const response = await axiosInstance.post(`/videos/${videoId}/comments`, commentPayload, {
                params: { api_key: apiKey }
            });
            
            // Prepend the new comment if posting is successful and update the console log
            if (response.data && mainVideo.id === videoId) {
                setMainVideo(prevMainVideo => ({
                    ...prevMainVideo,
                    comments: [response.data, ...prevMainVideo.comments]
                }));

                console.log(`Comment posted: Video ID: ${videoId}, API Key: ${apiKey}, Comment Id: ${response.data.id}`);
            }

            return { success: true, comment: response.data };
        } catch (error) {
            console.error("Failed to post comment:", error);
            return { success: false, message: error.message };
        }
    };

    // Deletes a specific comment from a video
    const deleteComment = async (videoId, commentId) => {
        console.log(`Attempting to delete comment with ID: ${commentId} from video with ID: ${videoId} using API key: ${apiKey}`);
        try {
            const response = await axiosInstance.delete(`/videos/${videoId}/comments/${commentId}`, { params: { api_key: apiKey } });
            console.log("Comment deleted successfully:", response.data);
            updateMainVideo(videoId);
        } catch (error) {
            console.error("Sorry, we can't delete that comment:", error);
        }
    };

    // Return the video data and manipulation functions
    return { videos, mainVideo, updateMainVideo, postComment, deleteComment };
};

// Component that provides video data context to children
const VideoPageManager = ({ children }) => {
    const videoData = useFetchVideoData();

    return (
        // Provides videoData context to all child components, enabling them to access and manipulate video data
        <VideoContext.Provider value={videoData}>
            {children}
        </VideoContext.Provider>
    );
};

export default VideoPageManager;