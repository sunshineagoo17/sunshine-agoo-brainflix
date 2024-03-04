import React, { useState } from "react";
import "./Nav.scss";
import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import avatarImg from "../../assets/images/Mohan-muruge.jpg";

const Nav = () => {
    const [isTyping, setIsTyping] = useState(false);

    const handleInputChange = event => {
        const inputValue = event.target.value;
        setIsTyping(inputValue.length > 0);
    };

    return (
        <nav className="nav">
            <img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" />
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {!isTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    <input type="text" placeholder="Search" className="nav__search-bar" onChange={handleInputChange}/>
                </div>
                <div className="nav__avatar-container">
                    <img src={avatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>
            <div className="nav__upload-button-container">
                <button className="nav__upload-button">
                    <div className="nav__upload-icon-container">
                        <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                    </div>
                    <div className="nav__upload-copy">
                        Upload
                    </div>
                </button>
            </div>
        </nav>
    );
};

export default Nav;