import { useState, useLayoutEffect } from "react";

// Imports the stylesheet for the SideVideos component
import "./SideVideos.scss";

const SideVideos = ({ videos, mainVideoId, handleVideoClick }) => {
    // State to store the screen width for responsive design adjustments
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    // UseLayoutEffect to update the screen width state dynamically upon window resizing
    useLayoutEffect(() => {
        // Function that handles window resize and updates screen width state
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Attach the resize handler to the window's resize event
        window.onresize = handleResize;

        // Remove the resize handler when the component is not in use
        return () => {
            window.onresize = null;
        };       
    }, []);

    // Function to truncate text for mobile only
    const TruncateText = (text, maxLength, screenWidth) => {
        // If the screen width is larger than 446px, the full video title will be displayed
        if (screenWidth > 446) {
            return text;
        }

    // Truncate the text if it exceeds the max length
    return text.length > maxLength
        ? text.substr(0, text.lastIndexOf(" ", maxLength)).trim() + "..."
        : text;    
    };

    // Function that handles click on a side video thumbnail
    const handleSideVideoClick = (sideVideo) => {
        handleVideoClick(sideVideo.id);
    };

    // Excludes the currently selected video from the side videos list to avoid duplication
    const initialSideVideos = videos.filter(video => video.id !== mainVideoId);

    return (
        <div className="sideVideos">
            <div className="sideVideos__divider-container">
                <hr className="sideVideos__divider" />
            </div>
            <div className="sideVideos__videos-container">
                <div className="sideVideos__title-container">
                    <h3 className="sideVideos__header-title">
                        Next Videos
                    </h3>
                </div>
                {/* Iterates over side videos to render each as a thumbnail, applying unique styling as needed */}
                {initialSideVideos.map((video) => (
                    <div key={video.id} className="sideVideos__thumbnail">
                        <div className="sideVideos__thumbnail-info">
                        {/* Conditionally renders a unique wrapper for a specific video to match design mockup */}
                        {video.id === "25ce5d91-a262-4dcf-bb87-42b87546bcfa" ? (
                            <div className="sideVideos__unique-wrapper" onClick={() =>  handleSideVideoClick(video)}>
                                <img 
                                    src={video.image}
                                    alt={video.title}
                                    // Added a unique className for this specific video - to match the mockup
                                    className={`sideVideos__thumbnail-image sideVideos__unique-thumbnail-umbrellas-image`}
                                />
                            </div>
                        ) : (
                            // Container for defaul side video thumbnail
                            <div className="sideVideos__thumbnail-container" onClick={() => handleSideVideoClick(video)}>
                                <img
                                    src={video.image}
                                    alt={video.title}
                                    // Added a unique className for the last video
                                    className={`sideVideos__thumbnail-image ${video.id === "76ca28c0-7dea-4553-887f-8e5129a80fc3" ? "sideVideos__unique-thumbnail-last-image" : ""}`}
                                />
                            </div>
                        )}
                            <div className="sideVideos__info">
                                <h3 className={`sideVideos__title`}>
                                    {/* Truncate video title based on screen width */}
                                    {TruncateText(video.title, 40, screenWidth)}
                                </h3>
                                <p className="sideVideos__channel">{video.channel}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideVideos;