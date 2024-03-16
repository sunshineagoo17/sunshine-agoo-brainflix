import { useState } from "react";

// Import TimeAgo function from the main App component
import { TimeAgo } from "../../App";

// Imports the stylesheet for the Comments component
import "./Comments.scss";

// Imported icon and avatar
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";

const Comments = ({ comments }) => {
    // State that manages the comment input value
    const [commentValue, setCommentValue] = useState("");
    // State that tracks hover state of the button
    const [isHovered, setIsHovered] = useState(false);
    // State that indicates whether the comment input is empty
    const [isCommentEmpty, setIsCommentEmpty] = useState(false);

    // Event handlers for the button
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Handles comment submission and validates input for emptiness
    const handleCommentButtonClick = () => {
        const isEmpty = commentValue.trim() === "";
        setIsCommentEmpty(isEmpty);
        
        // Logs a message to the console if the comment is empty
        if (!isEmpty) {
            console.log("Submitted comment:", commentValue);
            // Clears the input field after submission
            setCommentValue("");
        } else {
            console.log("You gotta add a comment!");
        }
    };
    
    // Event handler for comment input change
    const handleCommentChange = (event) => {
        // Updates the comment value in the state
        setCommentValue(event.target.value); 
        // Checks if the comment input is empty
        setIsCommentEmpty(event.target.value.trim() === "");
    };

    return (
        <section className="comments">
            {/* Comment form */}
            <div className="comments__form-container">
                <div className="comments__avatar-container">
                    {/* User avatar */}
                    <img src={AvatarImg} alt="Mohan Muruge" className="comments__avatar-img"/>
                </div>
                <div className="comments__form">
                    {/* Label for the comment input */}
                    <label htmlFor="input-comment" className="comments__label">
                        Join the conversation
                    </label>
                    {/* Textarea for entering comments */}
                    <textarea 
                        id="input-comment"
                        className={`comments__textarea ${isCommentEmpty ? "comments__error" : ""}`}
                        placeholder="Add a new comment"
                        autoComplete="off"
                        value={commentValue}
                        onChange={handleCommentChange} // Event handler for input change
                        onBlur={() => setIsCommentEmpty(false)} // Resets error state
                    />
                    {/* Comment button - for mobile */}
                    <div className="comments__button-container--bottom">
                        {/* Button for submitting comments */}
                        <button
                            className={`comments__button--bottom ${isHovered ? "hover" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleCommentButtonClick}
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
                {/* Comment button - for tablet and desktop */}
                <div className="comments__button-container--right">
                    {/* Button for submitting comments */}
                    <button
                        className={`comments__button--right ${isHovered ? "hover" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleCommentButtonClick}
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

            {/* Comments section */}
            <div className="comments__list">
                {/* Maps over the comments array and renders each comment */}
                {comments.map (({ comment, timestamp, name }) => (
                    <div key={timestamp} className="comments__item">
                        {/* Divider between comments */}
                        <div className="comments__divider-container">
                            <hr className="comments__divider" />
                        </div>
                        {/* Commenter info and timestamp */}
                        <div className="comments__list-container">
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Comments;