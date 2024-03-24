import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Importing context and child components for assembling the Video Details page
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager"; 
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

// Imports styling to the Video Details page
import "./VideoDetailsPage.scss";

const VideoDetailsPage = () => {
    // Retrieve the videoId from the URL
    const { videoId } = useParams();
    // Access context to use the video data and update function
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    // Initialize loading state to true
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadVideoDetails = async () => {
            if (videoId) {
                setIsLoading(true);
                try {
                    await updateMainVideo(videoId);
                } catch (error) {
                    console.error("Failed to load video details:", error);
                } 
                setIsLoading(false);
            }
        };
        
        loadVideoDetails();
    }, [videoId, updateMainVideo]); 

    return (
        <>
            {isLoading && <Loader />}
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
