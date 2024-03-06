import React, { useState } from "react";
import Header from "./components/Header/Header";
import Hero from './components/Hero/Hero';
import Comments from "./components/Comments/Comments";
import SideVideos from './components/SideVideos/SideVideos';
import VideoData from "./data/video-details.json";
import './App.css';

const App = () => {
  // State to keep track of the list of videos
  const [videos, setVideos] = useState(VideoData);
  // State to track the selected video
  const [selectedVideo, setSelectedVideo] = useState(VideoData[0]);

  // Function that handles a video click event
  const handleVideoClick = (video) => {
    // Check if the clicked videos is already selected
    if (video.id === selectedVideo.id) {
      return;
    }

    setVideos(prevVideos => {
      // Ensure each video in the list is unique
      const uniqueVideos = Array.from(new Set([selectedVideo, ...prevVideos.filter(v => v.id !== video.id)]));
      // Update the currently selected video
      setSelectedVideo(video);
      return uniqueVideos;
    });
  };

  // JSX for rendering the App component
  return (
    <div>
      {/* Displays Nav component */}
      <Header />
      {/* Display the main video component */}
      <Hero selectedVideo={selectedVideo} handleVideoClick={handleVideoClick} />
      {/* Display comments for the selected video */}
      <Comments comments={selectedVideo.comments} />
      {/* Display a list of videos on the side */}
      <SideVideos videos={videos} selectedVideo={selectedVideo} handleVideoClick={handleVideoClick} />
    </div>
  );
}

export default App;
