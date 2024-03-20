import { TimeAgo } from "../VideoPageManager/VideoPageManager";

// Imports the stylesheet for the VideoInfo component
import "./VideoInfo.scss";

// Imported icons
import ViewsIcon from "../../assets/images/icons/views.svg";
import LikesIcon from "../../assets/images/icons/likes.svg";

const VideoInfo = ({ mainVideo }) => {
    // Checks if there's a video to display, otherwise stops the function early
    if (!mainVideo) return null;

    // Format timestamp with TimeAgo function
    const formattedTimestamp = TimeAgo(mainVideo.timestamp);

    // Calculates the number of comments. If there are no comments, it defaults to 0
    const numOfComments = mainVideo.comments ? mainVideo.comments.length : 0;

    return (
        <section className="videoInfo">
            {/* Display video title */}
            <div className="videoInfo__video-title-container">
                <h1 className="videoInfo__video-title">{mainVideo.title}</h1>
            </div>
            {/* Divider above video info */}
            <div className="videoInfos__video-details-divider-container--top">
                <hr className="videoInfo__video-details-divider--top" />
            </div>
            {/* Video info section */}
            <div className="videoInfo__video-details--top">
                {/* Channel and Timestamp */}
                <div className="videoInfo__video-details--left">
                    <p className="videoInfo__channel">By {mainVideo.channel}</p>
                    <p className="videoInfo__timestamp">{formattedTimestamp}</p>
                </div>
                {/* Views and Likes */}
                <div className="videoInfo__video-details--right">
                    <div className="videoInfo__video-views-container">
                        <img src={ViewsIcon} alt="Views Icon" className="videoInfo__views-icon"/>
                        <p className="videoInfo__views">{mainVideo.views}</p>
                    </div>
                    <div className="videoInfo__video-likes-container">
                        <img src={LikesIcon} alt="Likes Icon" className="videoInfo__likes-icon"/>
                        <p className="videoInfo__likes">{mainVideo.likes}</p>
                    </div>
                </div>
            </div>
            {/* Divider below video info */}
            <div className="videoInfo__video-details-divider-container--bottom">
                <hr className="videoInfo__video-details-divider--bottom" />
            </div>    
            {/* Video description */}
            <div className="videoInfo__video-details--bottom">
                <p className="videoInfo__description">{mainVideo.description}</p>
            </div>
            {/* Displays the total number of comments for the video */}
            <div className="videoInfo__video-comments-counter">
                <p className="videoInfo__comments-counter">{numOfComments} Comments</p>
            </div>
        </section>
    );
};

export default VideoInfo;