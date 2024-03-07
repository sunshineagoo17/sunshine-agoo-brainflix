import React from "react";
import "./VideoDetails.scss";
import ViewsIcon from "../../assets/images/icons/views.svg";
import LikesIcon from "../../assets/images/icons/likes.svg";

const VideoDetails = ( {selectedVideo} ) => {
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
        <section className="videoDetails">
            <div className="videoDetails__video-title-container">
                <h1 className="videoDetails__video-title">{selectedVideo.title}</h1>
            </div>
            <div className="videoDetails__video-info-divider-container--top">
                <hr className="videoDetails__video-info-divider--top" />
            </div>
            <div className="videoDetails__video-info--top">
                <div className="videoDetails__video-info--left">
                    <p className="videoDetails__channel">By {selectedVideo.channel}</p>
                    <p className="videoDetails__timestamp">{formattedTimestamp}</p>
                </div>
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
            <div className="videoDetails__video-info-divider-container--bottom">
                <hr className="videoDetails__video-info-divider--bottom" />
            </div>    
            <div className="videoDetails__video-info--bottom">
                <p className="videoDetails__description">{selectedVideo.description}</p>
            </div>
            <div className="videoDetails__video-comments-counter">
                <p className="videoDetails__comments-counter">{numOfComments} Comments</p>
            </div>
        </section>
    );
};

export default VideoDetails;