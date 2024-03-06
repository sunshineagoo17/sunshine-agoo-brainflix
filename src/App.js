import React, { useState } from "react";
import Header from "./components/Header/Header";
import Hero from './components/Hero/Hero';
import Comments from "./components/Comments/Comments";
// import SideVideos from './components/SideVideos/SideVideos';
import VideoData from "./data/video-details.json";
import './App.css';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(VideoData[0]);
  const [sideVideos, setSideVideos] = useState(VideoData.slice(1));

  // Handles video click function
  const handleVideoClick = (video) => {
    setSideVideos([selectedVideo, ...sideVideos]);
    setSelectedVideo(video);
    setSideVideos(sideVideos.filter((sideVideo) => sideVideo.id !== video.id));
  };

  return (
    <div>
      <Header />
      <Hero selectedVideo={selectedVideo} handleVideoClick={handleVideoClick} />
      {/* <SideVideos sideVideos={sideVideos} handleVideoClick={handleVideoClick} /> */}
      <Comments comments={selectedVideo.comments} />
    </div>
  );
}

export default App;
