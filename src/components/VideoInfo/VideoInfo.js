import "./VideoInfo.scss";

import ViewsIcon from "../../assets/images/icons/views.svg";

const VideoInfo = ({ mainVideo, TimeAgo, handleLikeVideo }) => { 

    // If there's no video to display, stop the function early
    if (!mainVideo) return null;

    const formattedTimestamp = TimeAgo(mainVideo.timestamp);
    const numOfComments = mainVideo.comments ? mainVideo.comments.length : 0;

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
                        <svg 
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            aria-label="Like video"
                            className="videoInfo__likes-icon"
                            alt="Likes Icon"
                            onClick={handleLikeVideo}
                        >
                            <title>Like the video</title>
                            <path d="M12.325 0C10.846 0 9.4265 0.682105 8.5 1.76C7.5735 0.682105 6.154 0 4.675 0C2.057 0 0 2.03789 0 4.63158C0 7.81474 2.89 10.4084 7.2675 14.3495L8.5 15.4526L9.7325 14.3411C14.11 10.4084 17 7.81474 17 4.63158C17 2.03789 14.943 0 12.325 0Z"/>
                        </svg>
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