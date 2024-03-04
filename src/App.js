import React from "react";
import Nav from "./components/Nav/Nav";
import MainVideo from './components/MainVideo/MainVideo';
import SideVideos from './components/SideVideos/SideVideos';
import Comments from './components/Comments/Comments';
import './App.css';

function App() {
  return (
    <div>
      <Nav />
      <MainVideo />
      <SideVideos />
      <Comments />
    </div>
  );
}

export default App;
