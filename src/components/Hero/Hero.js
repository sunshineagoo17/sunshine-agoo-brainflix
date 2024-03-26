import "./Hero.scss";

import PlayButton from "../../assets/images/icons/play.svg";
import FullscreenButton from "../../assets/images/icons/fullscreen.svg";
import VolumeUpButton from "../../assets/images/icons/volume_up.svg";

const Hero = ({ mainVideo }) => {
    return (
        <section className="hero">
            {/* Render Main Video */}
            <div className="hero__main-video">
                {/* Main video with custom controls */}
                <video 
                    className="hero__main-video-image"
                    poster={mainVideo?.image} 
                    aria-label={mainVideo?.title} 
                    // controls - Added default controls since it's part of the requirements and was commented out since it doesn't match the mockup 
                />
                {/* Custom controls added (non-functional) */}
                <div className="hero__overlay-container">
                    <div className="hero__play-overlay">
                        <img className="hero__play-button" src={PlayButton} alt="Play Button" aria-label="Play video" />
                    </div>
                    <div className="hero__scrub-overlay">
                        <div className="hero__scrub-line-container">
                            <hr className="hero__scrub-divider" />
                        </div>
                        {/* Displays video duration - hard-coded for now since it's non-functional */}
                        <div className="hero__scrub-duration-container">
                            <p className="hero__scrub-duration">
                                0:00 /{" "} 
                                <span>{mainVideo?.duration}</span> 
                            </p>
                        </div>
                    </div>
                    <div className="hero__video-buttons-container-overlay">
                        <img className="hero__fullscreen-button" src={FullscreenButton} alt="Fullscreen Button" aria-label="Fullscreen video" />
                        <img className="hero__volume-up-button" src={VolumeUpButton} alt="Volume Up Button" aria-label="Volume up"/>                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;