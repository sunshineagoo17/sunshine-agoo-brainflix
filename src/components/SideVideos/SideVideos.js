import React, { useState, useEffect } from "react";
import "./SideVideos.scss";

const truncateText = (text, maxLength, screenWidth) => {
    if (screenWidth > 767) {
        return text;
    }

    return text.length > maxLength
        ? text.substr(0, text.lastIndexOf(" ", maxLength)).trim() + "..."
        : text;    
};

const SideVideos = ({ videos, selectedVideo, handleVideoClick }) => {
    const [screenWidth, setScreenWidth] = useState(
        window.innerWidth || document.documentElement.clientWidth
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };       
    }, []);

    const handleSideVideoClick = (sideVideo) => {
        if (sideVideo.id === selectedVideo.id) {
            return;
        }
        
        handleVideoClick(sideVideo);
    };

    // Filter out the selected video from the initial side video list
    const initialSideVideos = videos.filter(video => video.id !== selectedVideo.id);

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
                {initialSideVideos.map((video, index) => (
                    <div key={video.id} className="sideVideos__thumbnail" onClick={() => handleSideVideoClick(video)}>
                        <div className="sideVideos__thumbnail-info">
                            <div className="sideVIdeos__thumbnail-container">
                                <img src={video.image} alt={video.title} className="sideVideos__thumbnail-image"/>
                            </div>
                            <div className="sideVideos__info">
                                <h3 className={`sideVideos__title`}>
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