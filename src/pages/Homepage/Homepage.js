import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager";

// Import necessary components
import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

import "./Homepage.scss";

const Homepage = () => {
    // Accessing the video context to use the shared state and functions across components
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    
    // State to manage the loading indicator visibility
    const [isLoading, setIsLoading] = useState(true);

    // Uses the location hook to access the current URL path
    const location = useLocation(); 

    // Effect to set the first video as the main video on component mount or when video list changes
    useEffect(() => {
        if (videos.length > 0) {
            updateMainVideo(videos[0].id);
        }
    }, [videos, updateMainVideo, location.pathname]); 

    // Effect to hide the loader once the main video is set
    useEffect(() => {
        if (mainVideo) {
            setIsLoading(false);
        }
    }, [mainVideo]);
    
    return (
        <>
            {/* Show the loader while content is loading */}
            {isLoading && <Loader />}
            {!isLoading && (
            <div className="homepage">
                {mainVideo && (
                    <div className="homepage__container">
                        <Hero mainVideo={mainVideo} />

                        <div className="homepage__video-info-container">
                            <div className="homepage__video-info-text">
                                <VideoInfo mainVideo={mainVideo} />
                                <Comments comments={mainVideo?.comments || []} />
                            </div>
                            
                            <div className="homepage__video-info-thumbnails-container">
                                <div className="homepage__divider-container">
                                    <hr className="homepage__divider" />
                                </div>
                                <div className="homepage__video-info-thumbnails">
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
