import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultThumbnail from "../../assets/images/pictures/Upload-video-preview.jpg";
import PublishIcon from "../../assets/images/icons/publish.svg"

// Imports the stylesheet for the VideoUploadPage component
import "./VideoUploadPage.scss";

const VideoUploadPage = () => {
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // State to control the visibility of the alert
    const [showAlert, setShowAlert] = useState(false);
    // State for the title input value
    const [titleValue, setTitleValue] = useState("");
    // State for the description input value
    const [descriptionValue, setDescriptionValue] = useState("");
    // State for tracking hover state of the buttons
    const [isHovered, setIsHovered] = useState(false);
    // State for checking if the title input is empty (for validation)
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    // State for checking if the description input is empty (for validation)
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
    // State to track if the title input is focused
    const [isTitleFocuse, setIsTitleFocused] = useState(false);
    // State to track if the description input is focuse
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

    // Handles changes to the title input
    const handleInputChange = (e) => {
        const value = e.target.value;
        setTitleValue(value);
        setIsTitleEmpty(false); // Resets title validation state
    };

    // Handles changes to the description textarea
    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setDescriptionValue(value);
        setIsDescriptionEmpty(false); // Resets description validation state
    };

    // Sets focus states for title and description fields
    const handleTitleAreaFocus = () => setIsTitleFocused(true);
    const handleDescriptionAreaFocus = () => setIsDescriptionFocused(true);
    
    // Resets form states when focus moves away from form fields
    const handleFormBlur = (e) => {
        // Check if the blur event is triggered by leaving the textarea
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // This means the user clicked outside the form
            setIsTitleEmpty(false);
            setIsDescriptionEmpty(false);
            setIsTitleFocused(false);
            setIsDescriptionFocused(false);
        }
    };

    // Submits the form, showing an alert and navigating home if successful
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titleValue.trim() || !descriptionValue.trim()) {
            // Validates both title and description for non-empty values
            setIsTitleEmpty(!titleValue.trim());
            setIsDescriptionEmpty(!descriptionValue.trim());
            console.log("Both title and description are required.");
            return;
        }

        setShowAlert(true);
        setTimeout(() => navigate("/home"), 4000);
    };

    // Hover effect handlers for buttons
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Closes the success alert and navigates home immediately
    const handleCloseAlert = () => {
        setShowAlert(false);
        navigate("/home");
    }

    // Handles cancel action, navigating back without submitting
    const handleCancel = () => {
        navigate("/home");
    };

    return (
        <div className="videoUploadPage">
            <div className="videoUploadPage__nav-divider-container">
                <hr className="videoUploadPage__nav-divider" />
            </div>
            <div className="videoUploadPage__content-container">
                <h1 className="videoUploadPage__title">Upload Video</h1>

                {/* Top Divider - display only for mobile and desktop screens */}
                <div className="videoUploadPage__divider-container-top">
                    <hr className="videoUploadPage__divider-top" />
                </div>

                {/* Form for video upload inputs */}
                <form onBlur={handleFormBlur} onSubmit={handleSubmit} className="videoUploadPage__form">
                    <div className="videoUploadPage__thumbnail-and-inputs-container">
                        {/* Thumbnail Section */}
                        <div className="videoUploadpage__thumbnail-section">
                            <div className="videoUploadpage__thumbnail-label-container">
                                <label htmlFor="videoThumbnail" className="videoUploadPage__thumbnail-label">
                                    Video Thumbnail
                                </label>
                            </div>
                            <div className="videoUploadPage__thumbnail-container">
                                <img src={DefaultThumbnail} alt="biker video thumbnail" className="videoUploadPage__thumbnail" />
                            </div>
                        </div>
                        <div className="videoUploadPage__title-and-description-container">
                            <div className="videoUploadPage__input-container">
                                <div className="videoUploadPage__label-container--top">
                                    <label htmlFor="videoTitle" className="videoUploadPage__label--top">Title your video</label>
                                </div>
                                    {/* Title Input */}
                                    <input
                                        type="text"
                                        id="videoTitle"
                                        name="title"
                                        placeholder="Add a title to your video"
                                        className={`videoUploadPage__title-input ${titleValue.trim() ? "field__filled" : ""} ${isTitleEmpty ? "videoUploadPage__error" : ""} ${isTitleFocused ? "title__focused" : ""}`}
                                        value={titleValue}
                                        onChange={handleInputChange}
                                        onFocus={handleTitleAreaFocus}
                                        onBlur={() => {
                                            setIsTitleFocused(false);
                                            setIsTitleEmpty(!titleValue.trim());
                                        }}
                                    />
                            </div>

                            <div className="videoUploadPage__input-container">
                                <div className="videoUploadPage__label-container-bottom">
                                    <label htmlFor="videoDescription" className="videoUploadPage__label--bottom">Add a Video Description</label>
                                </div>
                                    {/* Description Textarea */}
                                    <textarea
                                        id="videoDescription"
                                        name="description"
                                        placeholder="Add a description to your video"
                                        className={`videoUploadPage__description-input ${descriptionValue.trim() ? "field__filled" : ""} ${isDescriptionEmpty ? "videoUploadPage__error" : ""} ${isDescriptionFocused ? "description__focused" : ""}`}
                                        value={descriptionValue}
                                        onChange={handleTextareaChange}
                                        onFocus={handleDescriptionAreaFocus}
                                        onBlur={() => {
                                            setIsDescriptionFocused(false);
                                            setIsDescriptionEmpty(!descriptionValue.trim());
                                        }}
                                    />    
                            </div>
                        </div>
                    </div>

                    {/* Bottom Divider - displays only for mobile and desktop screens */}
                    <div className="videoUploadPage__divider-container-bottom">
                        <hr className="videoUploadPage__divider-bottom" />
                    </div>

                    <div className="videoUploadPage__buttons-container">
                        {/* Button container for Publish button */}
                        <div className="videoUploadPage__button-publish-container">
                            {/* Hover effect applied */}
                            <button className={`videoUploadPage__button-publish ${isHovered ? "hover" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                type="submit"
                                aria-label="Publish"
                            >
                                <div className="videoUploadPage__publish-icon-container">
                                    {/* Publish icon */}
                                    <img src={PublishIcon} alt="publish icon" className="videoUploadPage__publish-icon" />
                                </div>
                                <div className="videoUploadPage__publish-copy">
                                    Publish
                                </div>
                            </button>    
                        </div>
                        {/* Button container for Cancel button */}
                        <div className="videoUploadPage__button-cancel-container">
                            {/* Hover effect applied */}
                            <button className={`videoUploadPage__button-cancel ${isHovered ? "hover" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleCancel}
                                type="button"
                                aria-label="Cancel"
                            >
                                <div className="videoUploadPage__cancel-copy">
                                    Cancel
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
                {/* Alert for successful upload */}
                {showAlert && (
                    <div className="alert">
                        Video uploaded successfully!
                        <button onClick={handleCloseAlert}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoUploadPage