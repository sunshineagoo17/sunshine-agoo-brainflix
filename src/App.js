import React, { useState } from "react";

// Imports necessary components that support the App component
import Header from "./components/Header/Header";
import Hero from './components/Hero/Hero';
import VideoInfo from "./components/VideoInfo/VideoInfo";
import Comments from "./components/Comments/Comments";
import SideVideos from './components/SideVideos/SideVideos';

// Imports video data from the JSON file
import VideoData from "./data/video-details.json";

// Imports the main stylesheet for the App component
import './App.scss';

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
      <Hero mainVideo={mainVideoInfo} />
      <div className="app__video-details-container">
        <div className="app__video-details-text">
          {/* Displays main video description */}
          <VideoInfo mainVideo={mainVideoDetails} />
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
