import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Imports necessary components that support the App component
import Header from "./components/Header/Header";
import VideoPageManager from "./components/VideoPageManager/VideoPageManager";

// Imports page components
import VideoUploadPage from "./pages/VideoUploadPage/VideoUploadPage";
import VideoDetailsPage from "./pages/VideoDetailsPage/VideoDetailsPage";
import Homepage from "./pages/Homepage/Homepage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// Imports the main stylesheet for the App component
import "./App.scss";

const App = () => {
  // Render method for App component - defines routing and layout structure
  return (
    <Router>
      <div className="app">
         {/* Header component is displayed across all routes for consistent navigation */}
        <Header />
        <Routes>
          {/* Redirect route path "/" to home */}
          <Route path="/" element={<Navigate to="/home" />} />
          {/* Homepage and VideoDetailsPage are wrapped within VideoPageManager for context provision */}
          <Route path="/home" element={<VideoPageManager><Homepage /></VideoPageManager>} />
          <Route path="/video/:videoId" element={<VideoPageManager><VideoDetailsPage /></VideoPageManager>} />
          {/* VideoUploadPage is standalone and doesn't require context from VideoManager */}
          <Route path="/upload" element={<VideoUploadPage />} />
          {/* Redirect 404 path */}
          <Route path="*" element={<Navigate to="/uh-oh" />} />
          {/* Handle 404 errors */}
          <Route path="/uh-oh" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
