import React, { useState, useEffect } from "react";
import "./SideVideos.scss";

// Function to truncate text for mobile only
const truncateText = (text, maxLength, screenWidth) => {
    // If the screen width is larger than a tablet, it returns the full text
    if (screenWidth > 767) {
        return text;
    }

    // Truncate the text and add ellipsis if it exceeds the max length
    return text.length > maxLength
        ? text.substr(0, text.lastIndexOf(" ", maxLength)).trim() + "..."
        : text;    
};

const SideVideos = ({ videos, mainVideo, handleVideoClick }) => {
    const [screenWidth, setScreenWidth] = useState(
        window.innerWidth || document.documentElement.clientWidth
    );

    useEffect(() => {
        // Function that handles window resize and updates screen width state
        const handleResize = () => {
            setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Remove this event listener when the component is not in use
        return () => {
            window.removeEventListener("resize", handleResize);
        };       
    }, []);

    // Function that  handles click on a side video thumbnail
    const handleSideVideoClick = (sideVideo) => {
        if (sideVideo.id === mainVideo.id) {
            return;
        }
        
        handleVideoClick(sideVideo);
    };

    // Filter out the selected video from the initial side video list
    const initialSideVideos = videos.filter(video => video.id !== mainVideo.id);

    return (
        <div className="sideVideos">
            <div className="sideVideos__videos-container">
                <div className="sideVideos__divider-container">
                    <hr className="sideVideos__divider" />
                </div>
                <div className="sideVideos__title-container">
                    <h3 className="sideVideos__header-title">
                        Next Videos
                    </h3>
                </div>
                {/* Map through the initial side videos and render thumbnails */}
                {initialSideVideos.map((video, index) => (
                    <div key={video.id} className="sideVideos__thumbnail">
                        <div className="sideVideos__thumbnail-info">
                            <div className="sideVIdeos__thumbnail-container" onClick={() => handleSideVideoClick(video)}>
                                <img
                                src={video.image}
                                alt={video.title}
                                className={`sideVideos__thumbnail-image ${index === 1 ? "special-thumbnail-zoomed-image" : (index === 7 ? "unique-thumbnail-image" : "")}`}
                                />
                            </div>
                            <div className="sideVideos__info">
                                <h3 className={`sideVideos__title`}>
                                    {/* Truncate video title based on screen width */}
                                    {truncateText(video.title, 40, screenWidth)}
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