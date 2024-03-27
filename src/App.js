import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Imports necessary components that support the App component
import Header from "./components/Header/Header";

// Imports page components
import VideoUploadPage from "./pages/VideoUploadPage/VideoUploadPage";
import MainVideoPage from "./pages/MainVideoPage/MainVideoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

import "./App.scss";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          {/* Redirect route path "/" to home */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Homepage and VideoDetailsPage are wrapped within VideoPageManager for context provision */}
          <Route path="/home" element={<MainVideoPage />} />
          <Route path="/video/:videoId" element={<MainVideoPage />} />
          {/* VideoUploadPage is standalone and doesn't require context from VideoManager */}
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
