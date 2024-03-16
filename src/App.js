import React, { useState } from "react";

// Imports necessary components that support the App component
import Header from "./components/Header/Header";
import Hero from './components/Hero/Hero';
import VideoDetails from "./components/VideoDetails/VideoDetails";
import Comments from "./components/Comments/Comments";
import SideVideos from './components/SideVideos/SideVideos';

// Imports video data from the JSON file
import VideoData from "./data/video-details.json";

// Imports the main stylesheet for the App component
import './App.scss';

// Function that formats dynamic timestamp - used in Comments and VideoDetails components
export function TimeAgo(timestamp) {
  // Converts the timestamp to a date object for the comment date
  const commentDate = new Date(timestamp);
  // Gets the current date and time
  const now = new Date();
  
  // Calculates the time difference in seconds between the current time and the comment time
  const timeDifference = Math.floor((now - commentDate) / 1000);
  // Calculates the time difference 
  if (timeDifference < 60) return "Just now";
  if (timeDifference < 3600) return `${Math.floor(timeDifference / 60)} minutes ago`;
  if (timeDifference < 86400) return `${Math.floor(timeDifference / 3600)} hours ago`;
  if (timeDifference < 2592000) return `${Math.floor(timeDifference / 86400)} days ago`;
  if (timeDifference < 31536000) return `${Math.floor(timeDifference / 2592000)} months ago`;

  // Calculates and formats the time difference in years and append "years ago"
  return `${Math.floor(timeDifference / 31536000)} years ago`;
}

const App = () => {
  // State to keep track of the list of videos
  const [videos, setVideos] = useState(VideoData);
  // State to track the selected video
  const [mainVideoId, setMainVideoId] = useState(VideoData[0].id);

  // Find the main video details using mainVideoId
  const mainVideoDetails = videos.find(video => video.id === mainVideoId);

  const handleVideoSelect = (selectedVideoId) => {
    setMainVideoId(selectedVideoId);

    // Updates the video list, setting the selected video as the main and filtering out its previous instance  
    setVideos(initialVideos => {
      const newMainVideo = initialVideos.find(video => video.id === selectedVideoId);
      const filteredVideos = initialVideos.filter(video => video.id !== selectedVideoId);
      return [newMainVideo, ...filteredVideos];
    });
  };

  // JSX for rendering the App component
  return (
    <div className="app">
      {/* Displays Header component */}
      <Header />
      {/* Displays Hero component */}
      <Hero mainVideo={mainVideoDetails} />
      <div className="app__video-details-container">
        <div className="app__video-details-text">
          {/* Displays main video description */}
          <VideoDetails mainVideo={mainVideoDetails} />
          {/* Displays comments for the selected video */}
          <Comments comments={mainVideoDetails.comments} />
        </div>
        <div className="app__video-details-thumbnails-container">
          <div className="app__divider-container">
              <hr className="app__divider" />
          </div>
          <div className="app__video-details-thumbnails">
            {/* Displays a separate list of video thumbails */}
            <SideVideos videos={videos.filter(video => video.id !== mainVideoId)} handleVideoClick={handleVideoSelect} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
