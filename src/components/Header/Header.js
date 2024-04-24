import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import "./Header.scss";

import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";

const Header = () => {
    const [searchValue, setSearchValue] = useState(""); 
    const [userIsTyping, setUserIsTyping] = useState(false);  
    const location = useLocation(); 

    // Clears the search input and resets typing status when navigating to a different route
    useEffect(() => {
        setSearchValue("");
        setUserIsTyping(false);
    }, [location]); 
    
    // Updates search input state and determines if the user is currently typing
    const handleSearchInputChange = event => {
        const inputValue = event.target.value;
        setUserIsTyping(inputValue.length > 0);
    };

    return (
        <header className="nav">
    
            <Link to="/" aria-label="Homepage" className="nav__link"><img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" /></Link>
            
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {/* Search icon visibility toggles based on user typing status */}
                    {!userIsTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    <input
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        id="header-search"
                        className={`nav__search-bar ${searchValue ? "field--filled" : ""}`}
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value);
                            handleSearchInputChange(e)
                        }}
                    />
                </div>

                {/* Upload button - for desktop and tablet only */}
                <Link to="/upload" className="nav__upload-link">
                    <div className="nav__upload-button-container--right">
                        <button className="nav__upload-button--right"
                            aria-label="Upload"
                        >
                            <div className="nav__upload-icon-container">
                                <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                            </div>
                            <div className="nav__upload-copy">
                                Upload
                            </div>
                        </button>
                    </div>
                </Link>

                <div className="nav__avatar-container">
                    <img src={AvatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>

            {/* Upload button - for mobile  */}
            <div className="nav__upload-button-container--bottom">
                <Link to="/upload" aria-label="Upload Video">
                    <button className="nav__upload-button--bottom"
                            aria-label="Upload"
                    >
                        <div className="nav__upload-icon-container">
                            <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                        </div>
                        <div className="nav__upload-copy">
                            Upload
                        </div>
                    </button>
                </Link>
            </div>
        </header>
    );
};

export default Header;