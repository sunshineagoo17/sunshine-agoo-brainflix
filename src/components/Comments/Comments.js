import React, { useState } from "react";
import { TimeAgo } from "../../App";
import "./Comments.scss";
import AvatarImg from "../../assets/images/pictures/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";

const Comments = ({ comments }) => {
    // State for handling hover and empty comment
    const [isHovered, setIsHovered] = useState(false);
    const [isCommentEmpty, setIsCommentEmpty] = useState(false);

    // Event handlers for mouse enter, mouse leave and comment button click
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleCommentButtonClick = () => {
        const commentInput = document.getElementById("input-comment");
        if (commentInput && commentInput.value.trim() === "") {
            setIsCommentEmpty(true);
            console.log("You gotta add a comment.")
        } else {
            setIsCommentEmpty(false);
            if (commentInput) {
                commentInput.value = "";
            }
        }
    };
    
    // Function updates the isCommentEmpty based on whether the comment input is empty
    const handleCommentChange = (event) => setIsCommentEmpty(event.target.value.trim() === "");

    return (
        <section className="comments">
            {/* Comment form */}
            <div className="comments__form-container">
                <div className="comments__avatar-container">
                    <img src={AvatarImg} alt="Mohan Muruge" className="comments__avatar-img"/>
                </div>
                <div className="comments__form">
                    <label htmlFor="input-comment" className="comments__label">
                        Join the conversation
                    </label>
                    <textarea 
                        id="input-comment"
                        className={`comments__textarea ${isCommentEmpty ? "comments__error" : ""}`}
                        placeholder="Add a new comment"
                        autoComplete="off"
                        onChange={handleCommentChange} 
                        onBlur={() => setIsCommentEmpty(false)} 
                    />
                    {/* Comment button - for mobile */}
                    <div className="comments__button-container--bottom">
                        <button
                            className={`comments__button--bottom ${isHovered ? "hover" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleCommentButtonClick}
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
                {/* Comment button - for tablet and desktop */}
                <div className="comments__button-container--right">
                    <button
                        className={`comments__button--right ${isHovered ? "hover" : ""}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleCommentButtonClick}
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
            {/* Comments section */}
            <div className="comments__list">
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
                                        <p className="comments__username">{name}</p>
                                    </div>
                                    {/* Displaying the formatted timestamp using the TimeAgo function */}
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