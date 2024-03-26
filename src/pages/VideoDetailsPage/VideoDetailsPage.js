import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

// Context and components for assembling the Video Details page
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager"; 
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

import "./VideoDetailsPage.scss";

const VideoDetailsPage = () => {
    // Extracts videoId from the current URL
    const { videoId } = useParams();
    // Uses context to share video data and functionality across components
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Scroll to the top of the page on component mount or video change
        window.scrollTo(0, 0);
        
        // Function to load video details based on the current videoId
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
            {/* Displays loader while content is loading */}
            {isLoading && <Loader />}
            {/* Ensures mainVideo is loaded before rendering page content */}
            {!isLoading && mainVideo && (
                <div className="videoDetailsPage">
                    <div className="videoDetailsPage__container">
                        <Hero mainVideo={mainVideo} />
                            
                            <div className="videoDetailsPage__video-info-container">
                                <div className="videoDetailsPage__video-info-text">
                                    <VideoInfo mainVideo={mainVideo} />
                                    <Comments comments={mainVideo?.comments || []} />
                                </div>
                                <div className="videoDetailsPage__video-info-thumbnails-container">
                                    <div className="videoDetailsPage__divider-container">
                                        <hr className="videoDetailsPage__divider" />
                                    </div>
                                    
                                    <div className="videoDetailsPage__video-info-thumbnails">
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
