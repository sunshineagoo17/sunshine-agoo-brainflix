import React, { useState } from "react";

import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";
import DeleteIcon from "../../assets/images/icons/icon-delete.svg";
import LikeIcon from "../../assets/images/icons/icon-like.svg";

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
                                        <button className="comments__like-button" onClick={() => handleLikeComment(mainVideo.id, id)}>
                                            <img 
                                                src={LikeIcon}
                                                alt="Like"
                                                className="comments__like-icon" 
                                                title="Like the comment"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                            <span className="comments__like-count">{likes.toLocaleString()} likes</span> 
                                        </button>
                                        <button
                                            type="button"
                                            aria-label="Delete comment"
                                            className="comments__delete-button"
                                            onClick={(event) => handleDeleteComment(event, id)}
                                        >
                                            <img
                                                src={DeleteIcon}
                                                alt="Delete button"
                                                className="comments__delete-icon"
                                                title="Delete the comment"
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            />
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