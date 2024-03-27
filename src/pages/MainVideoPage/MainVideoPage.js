import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VideoContext } from "../../components/VideoPageManager/VideoPageManager";

import "./MainVideoPage.scss";

import Hero from "../../components/Hero/Hero";
import VideoInfo from "../../components/VideoInfo/VideoInfo";
import Comments from "../../components/Comments/Comments";
import SideVideos from "../../components/SideVideos/SideVideos";
import Loader from "../../components/Loader/Loader";

const MainVideoPage = () => {
    const { videoId } = useParams(); // Gets videoId from URL if present
    const { videos, mainVideo, updateMainVideo } = useContext(VideoContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Function to select which video to display
        const selectVideo = async () => {
            setIsLoading(true);
            window.scrollTo(0, 0); // Scroll to top on video change
            
            try {
                if (videoId) {
                    await updateMainVideo(videoId);
                } else if (videos.length > 0) {
                    await updateMainVideo(videos[0].id);
                }
            } catch (error) {
                console.error("Failed to load video:", error);
            } finally {
                setIsLoading(false);
            }
        };

        selectVideo();
    }, [videoId, videos, updateMainVideo]);

    return (
        <>
            {/* Show the loader while content is loading */}
            {isLoading && <Loader />}
            {!isLoading && (
                <div className="mainVideoPage"> 
                    {mainVideo && (
                        <div className="mainVideoPage">
                            <Hero mainVideo={mainVideo} />

                            <div className="mainVideoPage__video-info-container">
                                <div className="mainVideoPage__video-info-text">
                                    <VideoInfo mainVideo={mainVideo} />
                                    <Comments comments={mainVideo?.comments || []} />
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
