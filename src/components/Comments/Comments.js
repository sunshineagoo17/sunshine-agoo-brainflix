import React from "react";
import "./Comments.scss";
import AvatarImg from "../../assets/images/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/icons/add_comment.svg";

const Comments = ({ comments }) => {
    return (
        <section className="comments">
            <div className="comments__form-container">
                <div className="comments__avatar-container">
                    <img src={AvatarImg} alt="Mohan Muruge" className="comments__avatar-img"/>
                </div>
                <div className="comments__form">
                    <label htmlFor="input-comment" className="comments__label">
                        Join the conversation
                    </label>
                    <textarea id="input-comment" className="comments__textarea" placeholder="Add a new comment" autoComplete="off" />
                    <div className="comments__button-container--bottom">
                        <button className="comments__button--bottom">
                            <div className="comments__button-icon-container">
                                <img src={CommentIcon} alt="Comment Icon" className="comments__icon" />
                            </div>
                            <div className="comments__button-spacer" />
                            <div className="comments__copy">
                                Comment
                            </div>
                        </button>
                    </div>                   
                </div>
                <div className="comments__button-container--right">
                    <button className="comments__button--right">
                        <div className="comments__button-icon-container">
                            <img src={CommentIcon} alt="Comment Icon" className="comments__icon" />
                        </div>
                        <div className="comments__button-spacer" />
                        <div className="comments__copy">
                            Comment
                        </div>
                    </button>
                </div>
            </div>
            {/* Comments section */}
            <div className="comments__list">
                {comments.map ((comment) => (
                    <div key={comment.timestamp} className="comments__item">
                        <div className="comments__divider-container">
                            <hr className="comments__divider" />
                        </div>
                        <div className="comments__list-container">
                            <div className="comments__avatar" />
                            <div className="comments__commenter-info-container">
                                <div className="comments__commenter-info">
                                    <div className="comments__commenter-name-container">
                                        <p className="comments__username">{comment.name}</p>
                                    </div>
                                    <div className="comments__commenter-timestamp-container">
                                        <p className="comments__timestamp">
                                            {new Date(comment.timestamp).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                            })}
                                        </p>
                                    </div>
                                </div>
                                <div className="comments__single-container">
                                    <p className="comments__text">{comment.comment}</p>
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