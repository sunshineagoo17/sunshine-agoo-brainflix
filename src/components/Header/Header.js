import React, { useState } from "react";
import "./Header.scss";
import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import AvatarImg from "../../assets/images/Mohan-muruge.jpg";

const Nav = () => {
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
            <img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" />

            {/* Search bar and icons */}
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {/* Search icon is only visible when the user is not typing */}
                    {!userIsTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    {/* Search input */}
                    <input type="text" placeholder="Search" id="header-search" className="nav__search-bar" onChange={handleSearchInputChange}/>
                </div>

                {/* Upload button - for mobile only */}
                <div className="nav__upload-button-container--left">
                    <button className={`nav__upload-button--left ${isHovered ? "hover" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}>
                        <div className="nav__upload-icon-container">
                            <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                        </div>
                    <div className="nav__spacer" />
                    <div className="nav__upload-copy">
                        Upload
                    </div>
                </button>
                </div>

                {/* User Avatar */}
                <div className="nav__avatar-container">
                    <img src={AvatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>

            {/* Upload button - for tablet and desktop  */}
            <div className="nav__upload-button-container--right">
                <button className={`nav__upload-button--right ${isHovered ? "hover" : ""}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                    <div className="nav__upload-icon-container">
                        <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                    </div>
                    <div className="nav__spacer" />
                    <div className="nav__upload-copy">
                        Upload
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Nav;