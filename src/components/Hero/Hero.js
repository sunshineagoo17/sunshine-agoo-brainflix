// Imports the stylesheet for the Hero component
import "./Hero.scss";

// Imported icons
import PlayButton from "../../assets/images/icons/play.svg";
import FullscreenButton from "../../assets/images/icons/fullscreen.svg";
import VolumeUpButton from "../../assets/images/icons/volume_up.svg";

const Hero = ({ mainVideo }) => {
    return (
        <section className="hero">
            {/* Render Main Video */}
            <div className="hero__main-video">
                {/* Man video with custom controls */}
                <video 
                    className="hero__main-video-image"
                    poster={mainVideo.image}
                    alt={mainVideo.title}
                    // controls - Default vidoe controls are omitted and custom controls are provided to match the mockup 
                />
                {/* Custom controls added (non-functional) */}
                <div className="hero__overlay-container">
                    {/* Play button */}
                    <div className="hero__play-overlay">
                        {/* Play button icon */}
                        <img className="hero__play-button" src={PlayButton} alt="Play Button" />
                    </div>
                    {/* Scrub controls with video duration included */}
                    <div className="hero__scrub-overlay">
                        {/* Divider for scrub control line */}
                        <div className="hero__scrub-line-container">
                            <hr className="hero__scrub-divider" />
                        </div>
                        {/* Displays video duration - hard-coded for now since it's non-functional */}
                        <div className="hero__scrub-duration-container">
                            <p className="hero__scrub-duration">
                                0:00 /{" "} 
                                {/* Displays the duration of the main video */}
                                <span>{mainVideo.duration}</span> 
                            </p>
                        </div>
                    </div>
                    {/* Fullscreen and volume buttons */}
                    <div className="hero__video-buttons-container-overlay">
                        {/* Fullscreen button icon */}
                        <img className="hero__fullscreen-button" src={FullscreenButton} alt="Fullscreen Button" />
                        {/* Volume up button icon */}
                        <img className="hero__volume-up-button" src={VolumeUpButton} alt="Volume Up Button" />                       
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;