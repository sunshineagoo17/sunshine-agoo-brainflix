import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager";
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";
// Imports styling to the Homepage
import "./Homepage.scss";

const Homepage = () => {
    // Accessing the video context to use the shared state and functions across components
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    
    const [isLoading, setIsLoading] = useState(true);

    // Tracks the current URL path to react to navigation changes within the app
    const location = useLocation(); 

    // Automatically select the first video as the main video when the component mounts or the videos list changes
    useEffect(() => {
        // Ensures there's at least one video to set as the main video
        if (videos.length > 0) {
            updateMainVideo(videos[0].id);
        }
    }, [videos, updateMainVideo, location.pathname]); // Reacts to changes in the videos list, updateMainVideo function, or the URL path

    useEffect(() => {
        if (mainVideo) {
            setIsLoading(false);
        }
    }, [mainVideo]);
    
    return (
        <>
        {isLoading && <Loader />}
        {!isLoading && (
        <div className="homepage">
            {/* Conditionally render the main video and related components only if mainVideo is not null */}
            {mainVideo && (
                <div className="homepage__container">
                    {/* Hero component displaying the main video player */}
                    <Hero mainVideo={mainVideo} />
                    <div className="homepage__video-info-container">
                        <div className="homepage__video-info-text">
                            {/* VideoInfo component - displays the title, description, and likes of the main video */}
                            <VideoInfo mainVideo={mainVideo} />
                            {/* Comments component - lists comments for the main video */}
                            <Comments comments={mainVideo?.comments || []} />
                        </div>
                        <div className="homepage__video-info-thumbnails-container">
                            <div className="homepage__divider-container">
                                <hr className="homepage__divider" />
                            </div>
                            <div className="homepage__video-info-thumbnails">
                                {/* SideVideos component - displays thumbnails of other videos */}
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

export default Homepage;
