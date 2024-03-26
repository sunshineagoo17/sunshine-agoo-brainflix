import { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";

import "./VideoPageManager.scss";

// Define baseURL and initiate Axios instance at a global level 
export const baseURL = "https://project-2-api.herokuapp.com";
export const axiosInstance = axios.create({ baseURL });

// Context for sharing video data across components
export const VideoContext = createContext();

// Custom hook for convenient context usage
export const useVideoData = () => useContext(VideoContext);

// Function that formats dynamic timestamp - used in Comments and VideoInfo components
export const TimeAgo = (timestamp) => {
  const commentDate = new Date(timestamp);
  const now = new Date();
  
  // Calculates the time difference in seconds between the current time and the comment time
  const timeDifference = Math.floor((now - commentDate) / 1000);

  if (timeDifference < 60) return "Just now";
  if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)} minutes ago`;
  if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)} hours ago`;
  if (timeDifference < 2592000) return `${Math.floor(timeDifference / 86400)} days ago`;
  if (timeDifference < 31536000) return `${Math.floor(timeDifference / 2592000)} months ago`;

  return `${Math.floor(timeDifference / 31536000)} years ago`;
}

// Function that generates a random username for new comments posted
export function GenerateRandomUsername() {
    const firstName = [ "Tamie", "Homer", "Ross", "Hugo", "Jack", "Tyrion", "Marge", "Winnie", "Dragon", "Penguin"];
    const lastName = [ "Revers", "Bear", "Geller", "Lannister", "Hammock", "Castle", "Russell", "Hannigan", "Simpson", "Awesome"];

    const randomFirstName = firstName[Math.floor(Math.random() * firstName.length)];
    const randomLastName = lastName[Math.floor(Math.random() * lastName.length)];
    
    return `${randomFirstName} ${randomLastName}`;
}

// Custom hook to fetch and store the API key needed for making requests to the backend
export const useApiKey = () => {
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

    return apiKey;
};

// Hook to fetch video data from an API
export const useFetchVideoData = () => {
    const [videos, setVideos] = useState([]);
    const [mainVideo, setMainVideo] = useState(null);
    const apiKey = useApiKey();

    useEffect(() => {
        if (!apiKey) return; 
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/videos", { params: { api_key: apiKey } });
                setVideos(response.data);
            } catch (error) {
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
            const sortedComments = response.data.comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setMainVideo({
                ...response.data,
                comments: sortedComments,
            });
        } catch (error) {
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
            
            if (response.data && mainVideo.id === videoId) {
                setMainVideo(prevMainVideo => ({
                    ...prevMainVideo,
                    comments: [response.data, ...prevMainVideo.comments]
                }));

                console.log(`Comment posted: Video ID: ${videoId}, API Key: ${apiKey}, Comment ID: ${response.data.id}`);
            }
            
            return { success: true, comment: response.data };
        } catch (error) {
            console.error("Failed to post comment:", error);
            return { success: false, message: error.message };
        }
    };    

    // Deletes a specific comment from a video
    const deleteComment = async (videoId, commentId) => {
        console.log(`Attempting to delete comment with ID ${commentId} from video with ID ${videoId} using API key ${apiKey}`);
        try {
            const response = await axiosInstance.delete(`/videos/${videoId}/comments/${commentId}`, { params: { api_key: apiKey } });
            console.log("Comment deleted successfully:", response.data);
            updateMainVideo(videoId);
        } catch (error) {
            console.error("Sorry, we can't delete that comment:", error);
        }
    };

    return { videos, mainVideo, updateMainVideo, postComment, deleteComment };
};

// Component that provides video data context to children
const VideoPageManager = ({ children }) => {
    const videoData = useFetchVideoData();
  
    return (
        <VideoContext.Provider value={videoData}>
            {children}
        </VideoContext.Provider>
    );
};
            
export default VideoPageManager;
