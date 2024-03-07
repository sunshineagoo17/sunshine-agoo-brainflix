import React, { useState } from "react";
import "./Header.scss";
import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import AvatarImg from "../../assets/images/Mohan-muruge.jpg";

const Nav = () => {
    const [userIsTyping, updateTypingStatus] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleSearchInputChange = event => {
        const inputValue = event.target.value;
        updateTypingStatus(inputValue.length > 0);
    };

    return (
        <header className="nav">
            <img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" />
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {!userIsTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    <input type="text" placeholder="Search" id="header-search" className="nav__search-bar" onChange={handleSearchInputChange}/>
                </div>
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
                <div className="nav__avatar-container">
                    <img src={AvatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>
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