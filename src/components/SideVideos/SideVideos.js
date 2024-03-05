import React from "react";
import "./SideVideos.scss";

const SideVideos = ({ sideVideos, handleVideoClick }) => {
    return (
        <div className="side-videos">
            {sideVideos.map((video) => (
                <img
                    key={video.id}
                    src={video.image}
                    alt={video.title}
                    className="side-video-thumbnail"
                    onClick={() => handleVideoClick(video)}
                />
            ))}
        </div>
    );
};

export default SideVideos;