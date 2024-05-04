import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import "./SideVideos.scss";

const SideVideos = ({ videos, mainVideo, onVideoSelect }) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    // Handles dynamic screen width updates on window resize
    useLayoutEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth); 
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []); 

    // Truncates text to the specified maxLength if the screen width is below a threshold (mobile view)
    const TruncateText = (text, maxLength, screenWidth) => {
        if (screenWidth > 446) {
            return text;
        }

    return text.length > maxLength
        ? text.substr(0, text.lastIndexOf(" ", maxLength)).trim() + "..."
        : text;    
    };

    // Function to handle click on side video
    const handleSideVideoClick = () => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    if (!mainVideo || videos.length === 0) {
        return null;
    }

    // Filter out the main video from the list of side videos
    const filteredVideos = videos.filter(video => video.id !== mainVideo.id);

    return (
        <div className="sideVideos">
            <div className="sideVideos__divider-container">
                <hr className="sideVideos__divider" />
            </div>
            <div className="sideVideos__videos-container">
                <div className="sideVideos__title-container">
                    <h3 className="sideVideos__header-title">Next Videos</h3>
                </div>

                {/* List of side video thumbnails */}
                {filteredVideos.map((video) => (
                    <div key={video.id} className="sideVideos__thumbnail" onClick={() => onVideoSelect(video.id)}>
                        <Link 
                            to={`/video/${video.id}`}
                            className="sideVideos__thumbnail-link"
                            aria-label={`Watch ${video.title}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent the Link's default action when the div is clicked
                                handleSideVideoClick();
                            }}
                        > 
                            <div className="sideVideos__thumbnail-info">
                                {/* Created and added an inner wrapper for this specific video - to match the mockup */}
                                {video.id === "25ce5d91-a262-4dcf-bb87-42b87546bcfa" ? (
                                    <div className="sideVideos__unique-wrapper">
                                        <img 
                                            src={video.image}
                                            alt={video.title}
                                            // Added a unique className for this specific video - to match the mockup
                                            className={`sideVideos__thumbnail-image sideVideos__unique-thumbnail-umbrellas-image`}
                                        />
                                    </div>
                                ) : (
                                    <div className="sideVideos__thumbnail-container">
                                        <img
                                            src={video.image}
                                            alt={video.title}
                                            // Added a unique className for the last video
                                            className={`sideVideos__thumbnail-image ${video.id === "76ca28c0-7dea-4553-887f-8e5129a80fc3" ? "sideVideos__unique-thumbnail-last-image" : ""}`}
                                        />
                                    </div>
                                )}
                            </div>  
                        </Link>
                        
                        <div className="sideVideos__info">
                            {/* Displays a truncated version of the video title to fit within the design limits */}
                            <h3 className={`sideVideos__title`}>
                                {TruncateText(video.title, 40, screenWidth)}
                            </h3>
                            <p className="sideVideos__channel">{video.channel}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideVideos;
