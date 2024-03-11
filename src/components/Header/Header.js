import React, { useState } from "react";

// Imports the stylesheet for the Header component
import "./Header.scss";

// Imported icons and images for Header component
import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";

const Header = () => {
    // State for tracking user typing status and hover status
    const [userIsTyping, updateTypingStatus] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Event handler for search input 
    const handleSearchInputChange = event => {
        const inputValue = event.target.value;
        updateTypingStatus(inputValue.length > 0);
    };

    return (
        <header className="nav">
            {/* BrainFlix logo */}
            <a href="/">
                <img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" />
            </a>
            
            {/* Search bar and icons */}
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {/* Search icon is only visible when the user is not typing */}
                    {!userIsTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    {/* Search input */}
                    <input type="text" placeholder="Search" id="header-search" className="nav__search-bar" onChange={handleSearchInputChange}/>
                </div>

                {/* Upload button - for mobile only */}
                <div className="nav__upload-button-container--right">
                    {/* Hover effect applied */}
                    <button className={`nav__upload-button--right ${isHovered ? "hover" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                        <div className="nav__upload-icon-container">
                            {/* Upload icon */}
                            <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                        </div>
                        <div className="nav__upload-copy">
                            Upload
                        </div>
                    </button>
                </div>

                {/* User Avatar */}
                <div className="nav__avatar-container">
                    {/* User avatar image */}
                    <img src={AvatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>

            {/* Upload button - for tablet and desktop  */}
            <div className="nav__upload-button-container--bottom">
                {/* Hover effect applied */}
                <button className={`nav__upload-button--bottom ${isHovered ? "hover" : ""}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                    <div className="nav__upload-icon-container">
                        {/* Upload icon */}
                        <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                    </div>
                    <div className="nav__upload-copy">
                        Upload
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Header;