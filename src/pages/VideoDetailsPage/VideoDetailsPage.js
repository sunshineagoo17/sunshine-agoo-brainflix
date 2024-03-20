import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

// Importing context and child components for assembling the Video Details Page
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager";
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";

// Imports specific styling to the Video Details page
import "./VideoDetailsPage.scss"

const VideoDetailsPage = () => {
    // Retrieve the videoId from the URL
    const { videoId } = useParams();
    // Access context to use the video data and update function
    const  { videos, mainVideo, updateMainVideo } = useContext(VideoContext);

    // Update main video based on URL change to videoId
    useEffect(() => {
        // Call updateMainVideo function if a videoId exists
        if (videoId) {
            updateMainVideo(videoId); // Fetch and display the details for the video corresponding to videoId
        }
    }, [videoId, updateMainVideo]); // Effect reruns when videoId changes or updateMainVideo function updates
    
    return (
        <div className="videoDetailsPage">
            {/* Conditionally rendering to ensure mainVideo data is available before attempting to display it  */}
            { mainVideo && (
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
            )}
        </div>
    );
};

export default VideoDetailsPage;
