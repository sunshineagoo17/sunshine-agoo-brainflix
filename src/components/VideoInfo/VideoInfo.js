import { useState } from "react";

import "./VideoInfo.scss";

import ViewsIcon from "../../assets/images/icons/views.svg";
import LikesIcon from "../../assets/images/icons/likes.svg";

const VideoInfo = ({ mainVideo, TimeAgo, handleLikeVideo }) => {
    const [isHovered, setIsHovered] = useState(false); 

    // If there's no video to display, stop the function early
    if (!mainVideo) return null;

    const formattedTimestamp = TimeAgo(mainVideo.timestamp);
    const numOfComments = mainVideo.comments ? mainVideo.comments.length : 0;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    return (
        <section className="videoInfo">
      
            <div className="videoInfo__video-title-container">
                <h1 className="videoInfo__video-title">{mainVideo.title}</h1>
            </div>
            
            <div className="videoInfo__video-details-divider-container--top">
                <hr className="videoInfo__video-details-divider--top" />
            </div>
          
            <div className="videoInfo__video-details--top">
              
                <div className="videoInfo__video-details--left">
                    <p className="videoInfo__channel">By {mainVideo.channel}</p>
                    <p className="videoInfo__timestamp">{formattedTimestamp}</p>
                </div>
                
                <div className="videoInfo__video-details--right">
                    <div className="videoInfo__video-views-container">
                        <img src={ViewsIcon} alt="Views Icon" className="videoInfo__views-icon"/>
                        <p className="videoInfo__views">{mainVideo.views}</p>
                    </div>
                    <div className="videoInfo__video-likes-container">
                        <img 
                            src={LikesIcon}
                            alt="Likes Icon"
                            className={`videoInfo__likes-icon ${isHovered ? "videoInfo__likes-icon--hovered" : ""}`}
                            title="Like the video"
                            onClick={handleLikeVideo}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <p className="videoInfo__likes">{mainVideo.likes}</p>
                    </div>
                </div>
            </div>
          
            <div className="videoInfo__video-details-divider-container--bottom">
                <hr className="videoInfo__video-details-divider--bottom" />
            </div>    
        
            <div className="videoInfo__video-details--bottom">
                <p className="videoInfo__description">{mainVideo.description}</p>
            </div>
           
            <div className="videoInfo__video-comments-counter">
                <p className="videoInfo__comments-counter">{numOfComments} Comments</p>
            </div>
        </section>
    );
};

export default VideoInfo;