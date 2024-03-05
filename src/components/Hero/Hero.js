import React from "react";
import "./Hero.scss";
import playButton from "../../assets/images/icons/play.svg";
import fullscreenButton from "../../assets/images/icons/fullscreen.svg";
import volumeUpButton from "../../assets/images/icons/volume_up.svg";
import viewsIcon from "../../assets/images/icons/views.svg";
import likesIcon from "../../assets/images/icons/likes.svg";


const Hero = ( {selectedVideo} ) => {
    // Format timestamp
    const formatTimestamp = (timestamp) => {
        try {
            const formattedDate = new Date(timestamp);
            const dateOptions = { 
                month: "2-digit",
                day: "numeric",
                year: "numeric",
            };
            return formattedDate.toLocaleDateString("en-US", dateOptions);
        } catch (error) {
            console.error("Error formatting timestamp:", error);
            return timestamp;
        }
    };

    const formattedTimestamp = formatTimestamp(selectedVideo.timestamp);

    // Selected video's number of comments
    const numOfComments = selectedVideo.comments.length;

    return (
        <section className="hero">
            {/* Render Main Video */}
            <div className="hero__main-video">
                <div className="hero__overlay-container">
                    <div className="hero__play-overlay">
                        <img className="hero__play-button" src={playButton} alt="Play Button" />
                    </div>
                    <div className="hero__scrub-overlay">
                        <div className="hero__scrub-line-container">
                            <hr className="hero__scrub-divider" />
                        </div>
                        <div className="hero__scrub-duration-container">
                            <p className="hero__scrub-duration">
                                0:00 / 4:01
                            </p>
                        </div>
                    </div>
                    <div className="hero__video-buttons-container-overlay">
                        <img className="hero__fullscreen-button" src={fullscreenButton} alt="Fullscreen Button" />
                        <img className="hero__volume-up-button" src={volumeUpButton} alt="Volume Up Button" />                       
                    </div>
                </div>
                <video 
                    className="hero__main-video-image"
                    poster={selectedVideo.image}
                    alt={selectedVideo.title}
                />
            </div>
            {/* Video Details */}
            <div className="hero__video-details-container">
                <div className="hero__video-title-container">
                    <h1 className="hero__video-title">{selectedVideo.title}</h1>
                </div>
                <div className="hero__video-info-divider-container--top">
                    <hr className="hero__video-info-divider--top" />
                </div>
                <div className="hero__video-info--top">
                    <div className="hero__video-info--left">
                        <p className="hero__channel">By {selectedVideo.channel}</p>
                        <p className="hero__timestamp">{formattedTimestamp}</p>
                    </div>
                    <div className="hero__video-info--right">
                        <div className="hero__video-views-container">
                            <img src={viewsIcon} alt="Views Icon" className="hero__views-icon"/>
                            <p className="hero__views">{selectedVideo.views}</p>
                        </div>
                        <div className="hero__video-likes-container">
                            <img src={likesIcon} alt="Likes Icon" className="hero__likes-icon"/>
                            <p className="hero__likes">{selectedVideo.likes}</p>
                        </div>
                    </div>
                </div>
                <div className="hero__video-info-divider-container--bottom">
                    <hr className="hero__video-info-divider--bottom" />
                </div>    
                <div className="hero__video-info--bottom">
                    <p className="hero__description">{selectedVideo.description}</p>
                </div>
                <div className="hero__video-comments-counter">
                    <p className="hero__comments-counter">{numOfComments} Comments</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;