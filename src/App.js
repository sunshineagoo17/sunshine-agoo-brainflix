import React, { useState } from "react";
import Header from "./components/Header/Header";
import Hero from './components/Hero/Hero';
import VideoDetails from "./components/VideoDetails/VideoDetails";
import Comments from "./components/Comments/Comments";
import SideVideos from './components/SideVideos/SideVideos';
import VideoData from "./data/video-details.json";
import './App.scss';

// Function that formats dynamic timestamp - used in Comments and VideoDetails components
export function timeAgo(timestamp) {
  const commentDate = new Date(timestamp);
  const now = new Date();
  const timeDifference = Math.floor((now - commentDate) / 1000);
  
  // Calculate time difference
  if (timeDifference < 60) return "Just now";
  if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)} minutes ago`;
  if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)} hours ago`;
  if (timeDifference < 2592000) return `${Math.floor(timeDifference / 86400)} days ago`;
  if (timeDifference < 31536000) return `${Math.floor(timeDifference / 2592000)} months ago`;
  
  return `${Math.floor(timeDifference / 31536000)} years ago`;

}

const App = () => {
  // State to keep track of the list of videos
  const [videos, setVideos] = useState(VideoData);
  // State to track the selected video
  const [mainVideo, setMainVideo] = useState(VideoData[0]);

  // Function that handles a video click event
  const handleVideoClick = (video) => {
    // Check if the clicked videos is already selected
    if (video.id === mainVideo.id) {
      return;
    }

    setVideos(prevVideos => {
      // Ensure each video in the list is unique
      const uniqueVideos = Array.from(new Set([mainVideo, ...prevVideos.filter(v => v.id !== video.id)]));
      // Update the currently selected video
      setMainVideo(video);
      return uniqueVideos;
    });
  };

  // JSX for rendering the App component
  return (
    <div className="app">
      {/* Displays Nav component */}
      <Header />
      {/* Display the main video component */}
      <Hero mainVideo={mainVideo} handleVideoClick={handleVideoClick} />
      <div className="app__video-details-container">
        <div className="app__video-details-text">
          {/* Display main video description */}
          <VideoDetails mainVideo={mainVideo} />
          {/* Display comments for the selected video */}
          <Comments comments={mainVideo.comments} />
        </div>
        <div className="app__video-details-thumbnails-container">
          <div className="app__divider-container">
              <hr className="app__divider" />
          </div>
          <div className="app__video-details-thumbnails">
            {/* Display a list of videos on the side */}
            <SideVideos videos={videos} mainVideo={mainVideo} handleVideoClick={handleVideoClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
