import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Imports the stylesheet for the Header component
import "./Header.scss";

// Imported icons and images for Header component
import BrainFlixLogo from "../../assets/images/logo/BrainFlix-logo.svg";
import SearchIcon from "../../assets/images/icons/search.svg";
import UploadIcon from "../../assets/images/icons/upload.svg";
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";

const Header = () => {
    const [searchValue, setSearchValue] = useState(""); // State for the search input value
    const [userIsTyping, setUserIsTyping] = useState(false); // State to manage if the user is currently typing in the search input
    const [isHovered, setIsHovered] = useState(false); // State to manage hover effect on buttons
    const location = useLocation(); // Detects location changes

    // Whenever the page changes, the search bar is cleared and this indicates typing has stopped
    useEffect(() => {
        // Clear the search input when navigating to a new page
        setSearchValue("");
        setUserIsTyping(false);
    }, [location]); // Reacts to changes in the current page location
    
    // Function to update userIsTyping state based on search input changes
    const handleSearchInputChange = event => {
        const inputValue = event.target.value;
        // Checks if the input field is not empty to set the typing status
        setUserIsTyping(inputValue.length > 0);
    };

    return (
        <header className="nav">
            {/* Link to the homepage with the BrainFlix logo */}
            <Link to="/home" aria-label="Homepage" className="nav__link"><img src={BrainFlixLogo} alt="BrainFlix logo" className="nav__logo" /></Link>
            
            {/* Search bar and icons */}
            <div className="nav__search-list">
                <div className="nav__search-container">
                    {/* Search icon is only visible when the user is not typing in the search bar */}
                    {!userIsTyping && <img src={SearchIcon} alt="search icon" className="nav__search-icon" />}
                    {/* Search input field*/}
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
                        {/* Hover effects applied */}
                        <button className={`nav__upload-button--right ${isHovered ? "hover" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            aria-label="Upload"
                        >
                            <div className="nav__upload-icon-container">
                                {/* Upload icon */}
                                <img src={UploadIcon} alt="upload icon" className="nav__upload-icon" />
                            </div>
                            <div className="nav__upload-copy">
                                Upload
                            </div>
                        </button>
                    </div>
                </Link>

                <div className="nav__avatar-container">
                    {/* User avatar image */}
                    <img src={AvatarImg} className="nav__avatar" alt="Mohan Muruge" />
                </div>
            </div>

            {/* Upload button - for mobile  */}
            <div className="nav__upload-button-container--bottom">
                <Link to="/upload" aria-label="Upload Video">
                    {/* Hover effect applied */}
                    <button className={`nav__upload-button--bottom ${isHovered ? "hover" : ""}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            aria-label="Upload"
                    >
                        <div className="nav__upload-icon-container">
                            {/* Upload icon */}
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