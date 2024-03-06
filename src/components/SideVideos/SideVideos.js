import React from "react";
import "./SideVideos.scss";

const SideVideos = ({ sideVideos, handleVideoClick }) => {
    return (
        <div className="sideVideos">
            {sideVideos.map((video) => (
                <img
                    key={video.id}
                    src={video.image}
                    alt={video.title}
                    className="sideVideos__thumbnail"
                    onClick={() => handleVideoClick(video)}
                />
            ))}
        </div>
    );
};

export default SideVideos;