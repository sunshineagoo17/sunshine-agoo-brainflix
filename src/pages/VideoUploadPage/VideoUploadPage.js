import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultThumbnail from "../../assets/images/pictures/Upload-video-preview.jpg";
import PublishIcon from "../../assets/images/icons/publish.svg"
import Loader from "../../components/Loader/Loader";

import "./VideoUploadPage.scss";

const VideoUploadPage = ({ axiosInstance }) => {
    const navigate = useNavigate();

    // State hooks for managing form fields, hover state, validation errors, and submission status 
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showVideoUploadErrorAlert, setshowVideoUploadErrorAlert] = useState(false);
    const [showVideoIdErrorAlert, setshowVideoIdErrorAlert] = useState(false);
    const [titleValue, setTitleValue] = useState("");
    const [isTitleEmpty, setIsTitleEmpty] = useState(false);
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [descriptionValue, setDescriptionValue] = useState("");
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [isLoading , setIsLoading] = useState(true);
    const [posterImage, setPosterImage] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState("No file chosen");
    const [uploadedVideoId, setUploadedVideoId] = useState(null);
    
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
        setIsTitleEmpty(value.trim() === "");
    };

    const handleTextareaChange = (e) => {
        const value = e.target.value;
        setDescriptionValue(value);
        setIsDescriptionEmpty(value.trim() === "");
    };

    // Handler to update the selected file name when a file is chosen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const isTitleValid = titleValue.trim() !== "";
        const isDescriptionValid = descriptionValue.trim() !== "";

        if (file) {
            setPosterImage(file);
            setSelectedFileName(file.name);
            setIsFileSelected(true); 
        } else {
            setPosterImage(null);
            setSelectedFileName("No file chosen");
            setIsFileSelected(false);  

            // Trigger validation for title and description when no file is chosen
            setIsTitleEmpty(!isTitleValid);
            setIsDescriptionEmpty(!isDescriptionValid);
        }
    };

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
        const isTitleValid = titleValue.trim() !== "";
        const isDescriptionValid = descriptionValue.trim() !== "";
        const isFileSelectedValid = !!posterImage;
    
        setIsTitleEmpty(!isTitleValid);
        setIsDescriptionEmpty(!isDescriptionValid);
        setIsFileSelected(isFileSelectedValid);
    
        if (!isTitleValid || !isDescriptionValid || !isFileSelectedValid) {
            setShowErrorAlert(true);
            setFormSubmitted(true);
            console.log("All fields including an image are required.");
            return;
        }
    
        setIsLoading(true);
        const formData = new FormData();
        formData.append("title", titleValue.trim());
        formData.append("description", descriptionValue.trim());
        formData.append("posterImage", posterImage);
    
        try {
            const response = await axiosInstance.post("/videos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Video uploaded successfully:", response.data);
            if (response.data && response.data.videoId) {
                setShowAlert(true);
                setUploadedVideoId(response.data.videoId); // Save the video ID
    
                setTimeout(() => {
                    setShowAlert(false);
                    navigate(`/video/${response.data.videoId}`); // Navigate to the new video uploaded (instead of the homepage) for improved user experience
                }, 3000);
    
            } else {
                console.error("Upload failed: No valid video ID returned:", response.data);
                setshowVideoIdErrorAlert(true);
            }
        } catch (error) {
            console.error("Failed to upload video:", error);
            setshowVideoUploadErrorAlert(true);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCloseAlert = () => {
        setShowAlert(false);
        setIsDescriptionEmpty(false);
        setIsTitleEmpty(false);
        setIsFileSelected(!!posterImage);
        if (uploadedVideoId) {
            navigate(`/video/${uploadedVideoId}`); 
        }
    };

    // Cancel button handler to navigate to home without form submission
    const handleCancel = () => {
        navigate("/");
    };

    const handleErrorAlertClose = () => {
        setShowErrorAlert(false);
        setshowVideoIdErrorAlert(false);
        setshowVideoUploadErrorAlert(false);
        setIsDescriptionEmpty(false);
        setIsTitleEmpty(false);
        setIsFileSelected(true); 
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
                                        <img
                                            src={posterImage ? URL.createObjectURL(posterImage) : DefaultThumbnail}
                                            alt="biker video thumbnail"
                                            className="videoUploadPage__thumbnail"
                                        />
                                    </div>

                                    {/* Input field for uploading custom poster image */}
                                    <div className="videoUploadPage__thumbnail-upload-container">
                                    <label htmlFor="videoThumbnail" className="videoUploadPage__file-button">Choose Thumbnail</label>
                                    <input
                                        type="file"
                                        id="videoThumbnail"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="videoUploadPage__file-input"
                                    />
                                    <span className={`videoUploadPage__file-name ${
                                        !isFileSelected && formSubmitted ? "videoUploadPage__error" : ""
                                    }`}>
                                        {selectedFileName}
                                    </span>
                                    </div>
                                </div>

                                <div className="videoUploadPage__title-and-description-container">
                                    <div className="videoUploadPage__input-container">
                                        <div className="videoUploadPage__label-container--top">
                                            <label htmlFor="videoTitle" className="videoUploadPage__label--top">Title your video</label>
                                        </div> 
                                        <div className="videoUploadPage__input-wrapper">       
                                            <input
                                                type="text"
                                                id="videoTitle"
                                                name="title"
                                                aria-label="Enter video title"
                                                placeholder="Add a title to your video"
                                                className={`videoUploadPage__title-input ${
                                                    titleValue.trim() ? "field--filled" : ""
                                                } ${
                                                    (isTitleEmpty && formSubmitted) || (showErrorAlert && !isFileSelected)
                                                        ? "videoUploadPage__error"
                                                        : ""
                                                } ${isTitleFocused ? "title__focused" : ""}`}
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
                                    </div>
                                    
                                    <div className="videoUploadPage__input-container">
                                        <div className="videoUploadPage__label-container--bottom">
                                            <label htmlFor="videoDescription" className="videoUploadPage__label--bottom">Add a Video Description</label>
                                        </div>
                                        <div className="videoUploadPage__textarea-wrapper">   
                                            <textarea
                                                id="videoDescription"
                                                name="description"
                                                placeholder="Add a description to your video"
                                                className={`videoUploadPage__description-input ${
                                                    descriptionValue.trim() ? "field--filled" : ""
                                                } ${
                                                    (isDescriptionEmpty && formSubmitted) || (showErrorAlert && !isFileSelected)
                                                        ? "videoUploadPage__error"
                                                        : ""
                                                } ${isDescriptionFocused ? "description__focused" : ""}`}
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
                            </div>

                            <div className="videoUploadPage__divider-container--bottom">
                                <hr className="videoUploadPage__divider--bottom" />
                            </div>
                            
                            <div className="videoUploadPage__buttons-container">
                                <div className="videoUploadPage__button-publish-container">
                                    <button className="videoUploadPage__button-publish"
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
                                    <button className="videoUploadPage__button-cancel"
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
                                <p className="videoUploadPage__alert-text">
                                    Video uploaded successfully!
                                </p>
                                <button className="videoUploadPage__alert-button" onClick={handleCloseAlert} aria-label="Close">Close</button>
                            </div>
                        )}

                        {/* Error alert for missing title or description */}
                        {showErrorAlert && (
                            <div className="videoUploadPage__alert--error">
                                <p className="videoUploadPage__alert-text--error">
                                    All fields including an image are required.
                                </p>
                                <button 
                                    className="videoUploadPage__alert-button--error" 
                                    onClick={handleErrorAlertClose}
                                    aria-label="Close"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {/* Error alert for when the uploaded video fails to return a valid video ID */}
                        {showVideoIdErrorAlert && (
                            <div className="videoUploadPage__alert--error">
                                <p className="videoUploadPage__alert-text--error">
                                    Upload failed: No valid video ID returned.
                                </p>
                                <button 
                                    className="videoUploadPage__alert-button--error" 
                                    onClick={handleErrorAlertClose}
                                    aria-label="Close"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                        {/* Error alert for when the video upload fails unexpectedly */}
                        {showVideoUploadErrorAlert && (
                            <div className="videoUploadPage__alert--error">
                                <p className="videoUploadPage__alert-text--error">
                                    Apologies, we can't upload your video. Try again later.
                                </p>
                                <button 
                                    className="videoUploadPage__alert-button--error" 
                                    onClick={handleErrorAlertClose}
                                    aria-label="Close"
                                >
                                    Close
                                </button>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>           
    );
};

export default VideoUploadPage;