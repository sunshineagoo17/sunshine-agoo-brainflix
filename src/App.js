import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";

import VideoUploadPage from "./pages/VideoUploadPage/VideoUploadPage";
import MainVideoPage from "./pages/MainVideoPage/MainVideoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.scss";

// Instance is used to centralize and standardize HTTP requests to the backend server
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
});

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* Redirect route path "/" to home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<MainVideoPage />} />
          <Route path="/video/:videoId" element={<MainVideoPage />} />
          <Route path="/upload" element={<VideoUploadPage />} />
          {/* Redirect 404 path */}
          <Route path="*" element={<Navigate to="/uh-oh" />} />
          {/* Handles 404 errors */}
          <Route path="/uh-oh" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;