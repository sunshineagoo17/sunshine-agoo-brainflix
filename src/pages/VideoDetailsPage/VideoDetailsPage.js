import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To access URL parameters

// Context and components for assembling the Video Details page
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager"; 
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

// Imports styling to the Video Details page
import "./VideoDetailsPage.scss";

const VideoDetailsPage = () => {
    // Extracts videoId from the current URL
    const { videoId } = useParams();
    // Uses context to share video data and functionality across components
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    // State for managing the loading indicator
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Scroll to the top of the page on component mount or video change
        window.scrollTo(0, 0);
        
        // Function to load video details based on the current videoId
        const loadVideoDetails = async () => {
            // Ensure a videoId is present
            if (videoId) {
                // Start loading animation
                setIsLoading(true);
                try {
                    // Attempt to update the main video based on videoId
                    await updateMainVideo(videoId);
                    // Handle any errors that occur during fetch
                } catch (error) {
                    console.error("Failed to load video details:", error);
                } 
                // Stops loading animation
                setIsLoading(false);
            }
        };

        // Invokes the function to load video details
        loadVideoDetails();
        // Re-run effect if videoId changes or updateMainVideo function updates
    }, [videoId, updateMainVideo]); 

    return (
        <>
            {/* Displays loader while content is loading */}
            {isLoading && <Loader />}
            {/* Ensures mainVideo is loaded before rendering page content */}
            {!isLoading && mainVideo && (
                <div className="videoDetailsPage">
                    <div className="videoDetailsPage__container">
                        {/* Display the selected video's title, description, and other info */}
                        <Hero mainVideo={mainVideo} />
                            <div className="videoDetailsPage__video-info-container">
                                <div className="videoDetailsPage__video-info-text">
                                    <VideoInfo mainVideo={mainVideo} />
                                    {/* Comments section for the main video */}
                                    <Comments comments={mainVideo?.comments || []} />
                                </div>
                                <div className="videoDetailsPage__video-info-thumbnails-container">
                                    <div className="videoDetailsPage__divider-container">
                                        <hr className="videoDetailsPage__divider" />
                                    </div>
                                    <div className="videoDetailsPage__video-info-thumbnails">
                                        {/* List of thumbnails for side videos excluding the selected video */}
                                        <SideVideos videos={videos} mainVideo={mainVideo} />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            )}    
        </>
    
    );
};

export default VideoDetailsPage;
