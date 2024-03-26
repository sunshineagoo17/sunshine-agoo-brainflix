import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultThumbnail from "../../assets/images/pictures/Upload-video-preview.jpg";
import PublishIcon from "../../assets/images/icons/publish.svg"
import Loader from "../../components/Loader/Loader";

import "./VideoUploadPage.scss";

const VideoUploadPage = () => {
    const navigate = useNavigate();

    // State hooks for managing form fields, hover state, validation errors, and submission status 
    const [showAlert, setShowAlert] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading , setIsLoading] = useState(true);

    // Effect hook to manage loader visibility based on page load status
    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => window.removeEventListener("load", handleLoad);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTitleValue(value);
        setIsTitleEmpty(false); 
    };

    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setDescriptionValue(value);
        setIsDescriptionEmpty(false); 
    };

    // Focus handlers to visually indicate focus on input fields
    const handleTitleAreaFocus = () => setIsTitleFocused(true);
    const handleDescriptionAreaFocus = () => setIsDescriptionFocused(true);
    
    // Handler to reset focus states and validation states when moving away from the form fields
    const handleFormBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget) && !showAlert) {
            setIsTitleFocused(false);
            setIsDescriptionFocused(false);
            if (!formSubmitted) {
                setIsTitleEmpty(!titleValue.trim());
                setIsDescriptionEmpty(!descriptionValue.trim());
            }
        }
    };

    // Submission handler to validate the form fields and show alert on success
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const isTitleValid = titleValue.trim();
        const isDescriptionValid = descriptionValue.trim();
        
        setIsTitleEmpty(!isTitleValid);
        setIsDescriptionEmpty(!isDescriptionValid);
    
        if (!isTitleValid || !isDescriptionValid) {
            setFormSubmitted(true); 
            console.log("Both title and description are required.");
            return;
        }

        // Shows success alert and navigates away after a delay
        setShowAlert(true);
        setTimeout(() => navigate("/home"), 4000);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Closes the success alert and navigates to homepage
    const handleCloseAlert = () => {
        setShowAlert(false);
        navigate("/home");
    }

    // Cancel button handler to navigate to home without form submission
    const handleCancel = () => {
        navigate("/home");
    };

    return (
        <>
            {/* Displays loader while content is loading */}
            {isLoading && <Loader />}
            {/* Render the form once loading is complete */}
            {!isLoading && (
                <div className="videoUploadPage">
                    <div className="videoUploadPage__nav-divider-container">
                        <hr className="videoUploadPage__nav-divider" />
                    </div>

                    <div className="videoUploadPage__content-container">
                        <h1 className="videoUploadPage__title">Upload Video</h1>

                        <div className="videoUploadPage__divider-container--top">
                            <hr className="videoUploadPage__divider--top" />
                        </div>

                        <form onBlur={handleFormBlur} onSubmit={handleSubmit} className="videoUploadPage__form">
                            <div className="videoUploadPage__thumbnail-and-inputs-container">
        
                                <div className="videoUploadPage__thumbnail-section">
                                    <div className="videoUploadPage__thumbnail-label-container">
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
                                        <input
                                            type="text"
                                            id="videoTitle"
                                            name="title"
                                            aria-label="Enter video title"
                                            placeholder="Add a title to your video"
                                            className={`videoUploadPage__title-input ${titleValue.trim() ? "field--filled" : ""} ${isTitleEmpty && formSubmitted ? "videoUploadPage__error" : ""} ${isTitleFocused ? "title__focused" : ""}`}
                                            value={titleValue}
                                            onChange={handleInputChange}
                                            onFocus={handleTitleAreaFocus}
                                            onBlur={() => {
                                                setIsTitleFocused(false);
                                                if (!formSubmitted) {
                                                    setIsTitleEmpty(!titleValue.trim());
                                                }
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="videoUploadPage__input-container">
                                        <div className="videoUploadPage__label-container--bottom">
                                            <label htmlFor="videoDescription" className="videoUploadPage__label--bottom">Add a Video Description</label>
                                        </div>    
                                            <textarea
                                                id="videoDescription"
                                                name="description"
                                                placeholder="Add a description to your video"
                                                className={`videoUploadPage__description-input ${descriptionValue.trim() ? "field--filled" : ""} ${isDescriptionEmpty && formSubmitted ? "videoUploadPage__error" : ""} ${isDescriptionFocused ? "description__focused" : ""}`}
                                                value={descriptionValue}
                                                aria-label="Enter video description"
                                                onChange={handleTextareaChange}
                                                onFocus={handleDescriptionAreaFocus}
                                                onBlur={() => {
                                                    setIsDescriptionFocused(false);
                                                    if (!formSubmitted) {
                                                        setIsDescriptionEmpty(!descriptionValue.trim());
                                                    }
                                                }}
                                            />
                                    </div>
                                </div>
                            </div>

                            <div className="videoUploadPage__divider-container--bottom">
                                <hr className="videoUploadPage__divider--bottom" />
                            </div>
                            
                            <div className="videoUploadPage__buttons-container">
                                <div className="videoUploadPage__button-publish-container">
                                    <button className={`videoUploadPage__button-publish ${isHovered ? "hover" : ""}`}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            type="submit"
                                            aria-label="Publish"
                                    >
                                        <div className="videoUploadPage__publish-icon-container">
                                            <img src={PublishIcon} alt="publish icon" className="videoUploadPage__publish-icon" />
                                        </div>
                                        <div className="videoUploadPage__publish-copy">
                                            Publish
                                        </div>
                                    </button>
                                </div>
                                
                                <div className="videoUploadPage__button-cancel-container">
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
                            <div className="videoUploadPage__alert">
                                Video uploaded successfully!
                                <button onClick={handleCloseAlert} aria-label="Close">Close</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>           
    );
};

export default VideoUploadPage;