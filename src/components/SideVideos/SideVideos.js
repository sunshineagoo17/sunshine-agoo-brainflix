import React from "react";
import "./SideVideos.scss";

const SideVideos = ({ videos, selectedVideo, handleVideoClick }) => {
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
            {initialSideVideos.map((video) => (
                <img
                    key={video.id}
                    src={video.image}
                    alt={video.title}
                    className="sideVideos__thumbnail"
                    onClick={() => handleSideVideoClick(video)}
                />
            ))}
        </div>
    );
};

export default SideVideos;