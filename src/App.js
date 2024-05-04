import React, { Suspense, lazy } from 'react'; 
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.scss";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
const VideoUploadPage = lazy(() => import("./pages/VideoUploadPage/VideoUploadPage"));
const MainVideoPage = lazy(() => import("./pages/MainVideoPage/MainVideoPage"));

// Instance is used to centralize and standardize HTTP requests to the backend server
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
});

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div className="app">
          <Header />
          <Routes>
            {/* Route "/" to the Main Video page */}
            <Route path="/" element={<MainVideoPage axiosInstance={axiosInstance} />} />
            {/* Route to display a specific video */}
            <Route path="/video/:videoId" element={<MainVideoPage axiosInstance={axiosInstance} />} />
            {/* Route to the video upload page */}
            <Route path="/upload" element={<VideoUploadPage axiosInstance={axiosInstance} />} />
            {/* Redirect 404 path */}
            <Route path="*" element={<Navigate to="/uh-oh" />} />
            {/* Handles 404 errors */}
            <Route path="/uh-oh" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;