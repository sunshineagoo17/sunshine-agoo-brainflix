import React from "react";
import { timeAgo } from "../../App";
import "./VideoDetails.scss";
import ViewsIcon from "../../assets/images/icons/views.svg";
import LikesIcon from "../../assets/images/icons/likes.svg";

const VideoDetails = ( {selectedVideo} ) => {
    // Format timestamp with timeAgo function
    const formattedTimestamp = timeAgo(selectedVideo.timestamp);

    // Selected video's number of comments for the selected video
    const numOfComments = selectedVideo.comments.length;

    return (
        <section className="videoDetails">
            {/* Display video title */}
            <div className="videoDetails__video-title-container">
                <h1 className="videoDetails__video-title">{selectedVideo.title}</h1>
            </div>
            {/* Divider above video info */}
            <div className="videoDetails__video-info-divider-container--top">
                <hr className="videoDetails__video-info-divider--top" />
            </div>
            {/* Video info section */}
            <div className="videoDetails__video-info--top">
                {/* Channel and Timestamp */}
                <div className="videoDetails__video-info--left">
                    <p className="videoDetails__channel">By {selectedVideo.channel}</p>
                    <p className="videoDetails__timestamp">{formattedTimestamp}</p>
                </div>
                {/* Views and Likes */}
                <div className="videoDetails__video-info--right">
                    <div className="videoDetails__video-views-container">
                        <img src={ViewsIcon} alt="Views Icon" className="videoDetails__views-icon"/>
                        <p className="videoDetails__views">{selectedVideo.views}</p>
                    </div>
                    <div className="videoDetails__video-likes-container">
                        <img src={LikesIcon} alt="Likes Icon" className="videoDetails__likes-icon"/>
                        <p className="videoDetails__likes">{selectedVideo.likes}</p>
                    </div>
                </div>
            </div>
            {/* Divider below video info */}
            <div className="videoDetails__video-info-divider-container--bottom">
                <hr className="videoDetails__video-info-divider--bottom" />
            </div>    
            {/* Video description */}
            <div className="videoDetails__video-info--bottom">
                <p className="videoDetails__description">{selectedVideo.description}</p>
            </div>
            {/* Displays the number of comments */}
            <div className="videoDetails__video-comments-counter">
                <p className="videoDetails__comments-counter">{numOfComments} Comments</p>
            </div>
        </section>
    );
};

export default VideoDetails;