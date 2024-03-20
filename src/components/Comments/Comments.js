import { useState, useContext } from "react";
import { VideoContext, TimeAgo, GenerateRandomUsername } from "../VideoPageManager/VideoPageManager";
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";
import DeleteIcon from "../../assets/images/icons/icon-delete.svg";

// Imports the stylesheet for the Comments component
import "./Comments.scss";

const Comments = () => {
    // Get the video and comment functions from VideoContext
    const { mainVideo, postComment, deleteComment } = useContext(VideoContext);

    // States for handling comment form interactions
    const [commentValue, setCommentValue] = useState(""); // Holds what's typed in the comment
    const [isHovered, setIsHovered] = useState(false); // State for tracking hover state of the comment button
    const [isCommentEmpty, setIsCommentEmpty] = useState(false); // State for checking if the comment input is empty (for validation)
    const [isTextareaFocused, setIsTextareaFocused] = useState(false); // State to track if the textarea is focused
    
    //Updates the comment text
    const handleCommentChange = (e) => {
        const value = e.target.value;
        setCommentValue(value); 
        setIsCommentEmpty(false); // Always remove error when typing
    };
    
    // Keeps track of whether the comment box is selected
    const handleTextareaFocus = () => {
        setIsTextareaFocused(true);
    }

    // Resets form states when clicking outside the form
    const handleFormBlur = (e) => {
        // Checks if the blur event is triggered by leaving the textarea
        if (!e.currentTarget.contains(e.relatedTarget)) {
            // This means the user clicked outside the form
            setIsCommentEmpty(false);
            setIsTextareaFocused(false);
        }
    };

    // Handles comment submission - prevents default form action, validates non-empty comment, and sets error state if empty
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentValue.trim()) {
            setIsCommentEmpty(true);
            console.log("You gotta add a comment.");
            return;
        }
        
        const username = GenerateRandomUsername(); // Generates a random username for the comment
        const result = await postComment(mainVideo.id, commentValue.trim(), username); // Posts the comment
        if (result.success) {
            setCommentValue(""); // Clears the comment box on success
            setIsCommentEmpty(false);
        } else { // Log any error messages
            console.log(result.message);
        }
    };

    // Functions to handle mouse enter/leave for button hover effect
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Deletes a comment when you click the delete icon
    const handleDeleteComment = async (commentId) => {
        await deleteComment(mainVideo.id, commentId);
    };

    return (
        <section className="comments">
            {/* Comment submission form */}
            <form onBlur={handleFormBlur} onSubmit={handleCommentSubmit} className="comments__form-container">
                <div className="comments__form-container">
                    <div className="comments__avatar-container">
                        {/* User avatar */}
                        <img src={AvatarImg} alt="Mohan Muruge" className="comments__avatar-img" />
                    </div>
                    <div className="comments__form">
                        {/* Label for the comment input */}
                        <label htmlFor="input-comment" className="comments__label">
                            Join the conversation
                        </label>
                        {/* Textarea for entering comments */}
                        <textarea 
                            id="input-comment"
                            className={`comments__textarea ${isCommentEmpty ? "comments__error" : ""} ${isTextareaFocused ? "comments__focused" : ""} ${commentValue.trim() !== "" ? "comments--filled" : ""}`}
                            placeholder="Add a new comment"
                            autoComplete="off"
                            value={commentValue}
                            onChange={handleCommentChange} // Event handler for input change
                            onFocus={handleTextareaFocus}
                            onBlur={() => { 
                                // Resets focus and error states when moving away from the textarea
                                setIsCommentEmpty(false);
                                setIsCommentEmpty(!commentValue.trim());
                            }}
                        />
                        {/* Comment button */}
                        <div className="comments__button-container--bottom">
                            <button
                                className={`comments__button--bottom ${isHovered ? "hover" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                aria-label="Comment"
                            >
                                <div className="comments__button-icon-container">
                                    {/* Comment icon */}
                                    <img src={CommentIcon} alt="Comment Icon" className="comments__icon" />
                                </div>
                                <div className="comments__copy">
                                    Comment
                                </div>
                            </button>
                        </div>                   
                    </div>
                    {/* Comment button */}
                    <div className="comments__button-container--right">
                        {/* Button for submitting comments */}
                        <button
                            className={`comments__button--right ${isHovered ? "hover" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            aria-label="Comment"
                        >
                            <div className="comments__button-icon-container">
                                {/* Comment icon */}
                                <img src={CommentIcon} alt="Comment Icon" className="comments__icon" />
                            </div>
                            <div className="comments__copy">
                                Comment
                            </div>
                        </button>
                    </div>
                </div>
            </form>

            {/* List of comments */}
            <div className="comments__list">
                {/* Loop through each comment and display it */}
                {mainVideo.comments.map (({ id, comment, timestamp, name }, index) => (
                    <div key={index} className="comments__item">
                        {/* Divider between comments */}
                        <div className="comments__divider-container">
                            <hr className="comments__divider" />
                        </div>
                        {/* Each comment block */}
                        <div className="comments__list-container">
                            {/* Placeholder for commenter's avatar */}
                            <div className="comments__avatar" />
                            <div className="comments__commenter-info-container">
                                <div className="comments__commenter-info">
                                    <div className="comments__commenter-name-container">
                                        {/* Display commenter's name */}
                                        <p className="comments__username">{name}</p>
                                    </div>
                                    {/* Displaying formatted timestamp using the TimeAgo function */}
                                    <div className="comments__commenter-timestamp-container">
                                        <p className="comments__timestamp">
                                            {TimeAgo(timestamp)}
                                        </p>
                                    </div>
                                </div>
                                {/* Displays the comment text */}
                                <div className="comments__single-container">
                                    <p className="comments__text">{comment}</p>
                                </div>

                                {/* Delete button */}
                                <div className="comments__delete-button-container">
                                    <img
                                        src={DeleteIcon}
                                        alt="Delete button"
                                        className="comments__delete-button"
                                        onClick={() => handleDeleteComment(id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Comments;