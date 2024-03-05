import React from "react";
import "./Hero.scss";

const Hero = ( {selectedVideo, handleVideoClick }) => {
    return (
        <section className="hero">
            {/* Render Main Video */}
            <div className="main-video">
                <img src={selectedVideo.image} alt={selectedVideo.title} />
                {/* Add other main video details */}
            </div>
        </section>
    );
};

export default Hero;