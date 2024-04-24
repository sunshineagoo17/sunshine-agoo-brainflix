import React, { useState } from "react";

import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";

import "./Comments.scss";

const Comments = ({
    postComment,
    deleteComment,
    mainVideo,
    TimeAgo,
    GenerateRandomUsername,
    handleLikeComment
}) => {

    // State management for comment input and UI interactions
    const [commentValue, setCommentValue] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [isCommentEmpty, setIsCommentEmpty] = useState(false);
    const [isTextareaFocused, setIsTextareaFocused] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    // Handles comment input changes
    const handleCommentChange = (e) => {
        const value = e.target.value;
        setCommentValue(value);
        setIsCommentEmpty(false);
        setShowErrorAlert(false);
    };

    const handleTextareaFocus = () => {
        setIsTextareaFocused(true);
    }

    // Handles focus losss on the entire form
    const handleFormBlur = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsCommentEmpty(false);
            setIsTextareaFocused(false);
        }
    };

    // Submits the comment to the server
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentValue.trim()) {
            setIsCommentEmpty(true);
            setShowErrorAlert(true);
            console.log("You gotta add a comment.");
            return;
        }

        // Generates a random username for the comment
        const username = GenerateRandomUsername();
        const result = await postComment(mainVideo.id, commentValue.trim(), username);
        if (result.success) {
            setCommentValue("");
            setIsCommentEmpty(false);
            setShowErrorAlert(false);
        } else {
            console.log(result.message);
        }
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleDeleteComment = async (event, commentId) => {
        event.preventDefault();
        event.stopPropagation();
        await deleteComment(mainVideo.id, commentId);
    };

    return (
        <section className="comments">
            {/* Comment submission form */}
            <form onBlur={handleFormBlur} onSubmit={handleCommentSubmit} className="comments__form-container">
                <div className="comments__form-container">
                    <div className="comments__avatar-container">
                        <img src={AvatarImg} alt="Mohan Muruge" className="comments__avatar-img" />
                    </div>

                    <div className="comments__form">    
                        <label htmlFor="input-comment" className="comments__label">
                            Join the conversation
                        </label>

                        <textarea 
                            id="input-comment"
                            // Dynamically applies CSS classes to the textarea based on the state of the comment input
                            className={`comments__textarea ${isCommentEmpty ? "comments__error" : ""} ${isTextareaFocused ? "comments__focused" : ""} ${commentValue.trim() !== "" ? "comments--filled" : ""}`}
                            placeholder="Add a new comment"
                            aria-label="Enter your comment here"
                            autoComplete="off"
                            value={commentValue}
                            onChange={handleCommentChange} 
                            onFocus={handleTextareaFocus}
                            onBlur={() => { 
                                // Resets focus and error states when moving away from the textarea
                                setIsCommentEmpty(false);
                                setIsCommentEmpty(!commentValue.trim());
                            }}
                        />
                       
                        <div className="comments__button-container--bottom">
                            <button
                                className={`comments__button--bottom ${isHovered ? "hover" : ""}`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                aria-label="Submit comment"
                            >
                                <div className="comments__button-icon-container">
                                    <img src={CommentIcon} alt="Comment Icon" className="comments__icon" />
                                </div>
                                <div className="comments__copy">
                                    Comment
                                </div>
                            </button>
                        </div>                   
                    </div>
                  
                    <div className="comments__button-container--right">
                        <button
                            className={`comments__button--right ${isHovered ? "hover" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            aria-label="Submit comment"
                        >
                            <div className="comments__button-icon-container">
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
                {mainVideo && mainVideo.comments && mainVideo.comments
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map(({ id, comment, timestamp, name, likes }, index) => (
                        <div key={`${id}-${index}`} className="comments__item">
                            <div className="comments__divider-container">
                                <hr className="comments__divider" />
                            </div>
                    
                            <div className="comments__list-container">
                                <div className="comments__avatar" />
                                <div className="comments__commenter-info-container">
                                    <div className="comments__commenter-info">
                                        <div className="comments__commenter-name-container">
                                            <p className="comments__username">{name}</p>
                                        </div>
                                        <div className="comments__commenter-timestamp-container">
                                            <p className="comments__timestamp">
                                                {TimeAgo(timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="comments__single-container">
                                        <p className="comments__text">{comment}</p>
                                    </div>

                                    <div className="comments__actions">
                                        <button
                                            type="button"
                                            aria-label="Like comment"
                                            className="comments__like-button"
                                            onClick={() => handleLikeComment(mainVideo.id, id)}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                            <svg 
                                                width="19"
                                                height="17"
                                                viewBox="0 0 19 17"
                                                className="comments__like-icon"
                                                alt="Like button"
                                            >
                                                <title>Like the comment</title>
                                                <path d="M10.4712 4.005L9.9725 6.53375C9.8675 7.05 10.0075 7.58375 10.34 7.98625C10.6725 8.38875 11.1625 8.625 11.6875 8.625H16.5V9.57L14.2513 14.75H7.1725C7.015 14.75 6.875 14.61 6.875 14.4525V7.5925L10.4712 4.005V4.005ZM11.25 0.75L5.64125 6.35875C5.30875 6.69125 5.125 7.1375 5.125 7.60125V14.4525C5.125 15.5812 6.04375 16.5 7.1725 16.5H14.26C14.8813 16.5 15.45 16.1763 15.765 15.6513L18.1012 10.27C18.1975 10.0513 18.25 9.815 18.25 9.57V8.625C18.25 7.6625 17.4625 6.875 16.5 6.875H11.6875L12.4925 2.80625C12.5363 2.61375 12.51 2.40375 12.4225 2.22875C12.2213 1.835 11.9675 1.47625 11.6525 1.16125L11.25 0.75ZM2.5 6.875H0.75V16.5H2.5C2.98125 16.5 3.375 16.1063 3.375 15.625V7.75C3.375 7.26875 2.98125 6.875 2.5 6.875Z"/>
                                            </svg>
                                            <span className="comments__like-count">
                                                {likes.toLocaleString()} {likes <= 1 ? "like" : "likes"}    
                                            </span> 
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Delete comment"
                                            className="comments__delete-button"
                                            onClick={(event) => handleDeleteComment(event, id)}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}>
                                            <svg 
                                                width="14"
                                                height="18"
                                                viewBox="0 0 14 18"
                                                className="comments__delete-icon"
                                                alt="Delete button"
                                            >
                                                <title>Delete the comment</title>
                                                <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                ))}
            </div>
            {showErrorAlert && (
                <div className="comments__alert--error">
                    <p className="comments__alert-text">
                        Please add a comment.
                    </p>
                    <button
                        className="comments__alert-close"
                        onClick={() => setShowErrorAlert(false)}
                    >
                        Close
                    </button>
                </div>
            )}
        </section>
    );
};

export default Comments;