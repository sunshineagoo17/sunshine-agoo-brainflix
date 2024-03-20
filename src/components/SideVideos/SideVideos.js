import { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

// Imports the stylesheet for the SideVideos component
import "./SideVideos.scss";

const SideVideos = ({ videos, mainVideo }) => {
    // State to hold the current screen width, used for responsive design decisions
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    // UseLayoutEffect to handle dynamic screen width updates on window resize
    useLayoutEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth); // Updates state with new screen width
        };

        // Add event listener for window resize to update screenWidth state
        window.addEventListener("resize", handleResize);

        // Cleanup function to remove the even listener when the component unmounts
        return () => window.removeEventListener("resize", handleResize);       
    }, []); // Empty dependency array ensures this runs only once at mount

   // Truncates text to the specified maxLength if the screen width is below a threshold (mobile view)
    const TruncateText = (text, maxLength, screenWidth) => {
        return screenWidth <= 446 && text.length > maxLength
            ? `${text.substr(0, maxLength).trim()}...`
            : text;
    };

    // Do not render the component if there's no mainVideo selected or the video list is empty
    if (!mainVideo || videos.length === 0) {
        return null;
    }

    // Filter out the main video from the list of side videos
    const filteredVideos = videos.filter(video => video.id !== mainVideo.Id);

    return (
        <div className="sideVideos">
            <div className="sideVideos__divider-container">
                <hr className="sideVideos__divider" />
            </div>
            <div className="sideVideos__videos-container">
                {/* Title for side videos section */}
                <div className="sideVideos__title-container">
                    <h3 className="sideVideos__header-title">Next Videos</h3>
                </div>
                {/* List of side video thumbnails */}
                {filteredVideos.map((video) => (
                    <div key={video.id} className="sideVideos__thumbnail">
                        {/* Wraps the video thumbnail in a link component to make it clickable, leading to the video's detail page */}
                        <Link to={`/video/${video.id}`} className="sideVideos__thumbnail-link">
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
                                    // Container for defaul side video thumbnail
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
                            {/* Displays a truncated version of the video title to fit within the design limits. The TruncateText function shortens the title based on screen width */}
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