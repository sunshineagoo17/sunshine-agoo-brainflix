import { useState, useRef, useEffect, useCallback } from "react";
import "./Hero.scss";

import CloseFullscreenButton from "../../assets/images/icons/close_fullscreen.svg";
import ScrubButton from "../../assets/images/icons/scrub.svg";
import FullscreenButton from "../../assets/images/icons/fullscreen.svg";
import VolumeOffButton from "../../assets/images/icons/volume_off.svg";
import VolumeUpButton from "../../assets/images/icons/volume_up.svg";

const Hero = ({ mainVideo }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [playedPercent, setPlayedPercent] = useState(0);  
    const [bufferedPercent, setBufferedPercent] = useState(0); 
    const [volumePercent, setVolumePercent] = useState(100);
    const [isHoveringVolume, setIsHoveringVolume] = useState(false);

    const videoRef = useRef(null);
    const isScrubbing = useRef(false);
    const volumeScrubTimeout = useRef(null);
    const volumeScrubRef = useRef(null);

    const adjustVolume = useCallback((volumeLevel) => {
        const clampedVolumeLevel = Math.max(0, Math.min(100, volumeLevel));
        videoRef.current.volume = clampedVolumeLevel / 100;
        setVolumePercent(clampedVolumeLevel);
        setIsMuted(clampedVolumeLevel === 0);
    
        // Show the volume scrub container when adjusting volume
        setIsHoveringVolume(true);
        // Clear and reset the timeout to hide the container
        clearTimeout(volumeScrubTimeout.current);
        volumeScrubTimeout.current = setTimeout(() => {
            setIsHoveringVolume(false);
        }, 3000);
    }, [setVolumePercent, setIsMuted]);    

    const toggleVolume = useCallback(() => {
        const newVolume = isMuted || volumePercent === 0 ? 100 : 0;
        adjustVolume(newVolume);
    
        // Clear any existing timeout to prevent unexpected hiding
        clearTimeout(volumeScrubTimeout.current);

        // Reset the timeout
        volumeScrubTimeout.current = setTimeout(() => {
            setIsHoveringVolume(false);
        }, 3000);
    }, [adjustVolume, isMuted, volumePercent]);   

    const handleVolumeMouseEnter = useCallback(() => {
        setIsHoveringVolume(true);
        clearTimeout(volumeScrubTimeout.current);
    }, []);
    
    const handleVolumeMouseLeave = useCallback((e) => {
        // Enhanced check for leaving towards unrelated elements
        const isLeavingVolumeScrub = e.relatedTarget && e.relatedTarget.classList &&
            (e.relatedTarget.classList.contains("hero__volume-scrub-container") ||
             e.relatedTarget.classList.contains("hero__volume-scrub") ||
             e.relatedTarget.classList.contains("hero__scrub-handle"));
    
        if (!isLeavingVolumeScrub) {
            volumeScrubTimeout.current = setTimeout(() => {
                setIsHoveringVolume(false);
            }, 3000); 
        }
    }, []);        

    const calculateAndAdjustVolume = useCallback((clientY) => {
        const volumeContainerRect = volumeScrubRef.current.getBoundingClientRect();
        const volumeContainerHeight = volumeContainerRect.height;
        const volumeContainerTop = volumeContainerRect.top;
    
        // Calculate the clicked position relative to the top of the volume scrub container
        const clickedPosition = clientY - volumeContainerTop;
    
        let volumeLevel = 100 - ((clickedPosition / volumeContainerHeight) * 100);
        volumeLevel = Math.max(0, Math.min(100, volumeLevel));
    
        adjustVolume(volumeLevel);
    }, [adjustVolume]);
    
    const handleVolumeScrubClick = useCallback((e) => {
        calculateAndAdjustVolume(e.clientY);
    }, [calculateAndAdjustVolume]);
    
    const handleVolumeScrub = useCallback((e) => {
        if (isScrubbing.current) {
            calculateAndAdjustVolume(e.clientY);
        }
    }, [calculateAndAdjustVolume, isScrubbing]);

    const handleVolumeMouseDown = useCallback((e) => {
        e.preventDefault();
        isScrubbing.current = true;
        document.addEventListener("mousemove", handleVolumeScrub);
        document.addEventListener("mouseup", () => {
            isScrubbing.current = false;
            document.removeEventListener("mousemove", handleVolumeScrub);
        }, { once: true });
    }, [handleVolumeScrub]);

    const handleScrub = useCallback((e) => {
        const scrubBar = document.querySelector(".hero__scrub-overlay");
        if (!scrubBar) return;
        
        const scrubWidth = scrubBar.offsetWidth;
        const clickedPosition = e.clientX - scrubBar.getBoundingClientRect().left;
        const scrubTime = (clickedPosition / scrubWidth) * videoRef.current.duration;
        videoRef.current.currentTime = scrubTime;
    }, []);

    const handleMouseMove = useCallback((e) => {
        if (isScrubbing.current) {
            handleScrub(e);
        }
    }, [handleScrub]);

    const handleMouseDown = useCallback((e) => {
        e.preventDefault();
        isScrubbing.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", () => {
            isScrubbing.current = false;
            document.removeEventListener("mousemove", handleMouseMove);
        }, { once: true });
    }, [handleMouseMove]);

    useEffect(() => {
        const handleMouseUp = () => {
            if (isScrubbing.current) {
                isScrubbing.current = false;
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            }
        };
        
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [handleMouseMove]);

    // Toggle play/pause functionality
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Toggle fullscreen functionality
    useEffect(() => {
        const updateFullscreenState = () => {
            setIsFullscreen(document.fullscreenElement != null);
        };
    
        document.addEventListener("fullscreenchange", updateFullscreenState);
        document.addEventListener("webkitfullscreenchange", updateFullscreenState); // For Safari
    
        return () => {
            document.removeEventListener("fullscreenchange", updateFullscreenState);
            document.removeEventListener("webkitfullscreenchange", updateFullscreenState); // For Safari
        };
    }, []);    

    const toggleFullscreen = () => {
        const videoContainer = videoRef.current.parentNode; 
        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
                });
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(err => {
                    console.error(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
                });
            }
        }
    };    

    useEffect(() => {
        // Reset video states when video source changes
        if (videoRef.current) {
            videoRef.current.load(); 
            videoRef.current.volume = 1; // Reset volume to max or previously saved state
            setIsPlaying(false);
            setCurrentTime(0);
            setPlayedPercent(0);
            setIsMuted(false);
            setVolumePercent(100);
        }
    }, [mainVideo.video]); 

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleTimeUpdate = () => {
            const played = (video.currentTime / video.duration) * 100;
            setCurrentTime(video.currentTime);
            setPlayedPercent(played);

            // Update buffered percent
            if (video.buffered.length > 0) {
                const bufferEnd = video.buffered.end(video.buffered.length - 1);
                const buffered = (bufferEnd / video.duration) * 100;
                setBufferedPercent(buffered);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
        };
    }, [videoRef]);   

    useEffect(() => {
        // Cleanup timeout when component unmounts
        return () => {
            if (volumeScrubTimeout.current) {
                clearTimeout(volumeScrubTimeout.current);
            }
        };
    }, []);    

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${String(seconds).padStart(2, "0")}`; 
    };    

    return (
        <section className="hero">
            <div className={`hero__main-video ${isFullscreen ? "fullscreen" : ""}`}>
                {/* Main video */}
                <video 
                    controls={false}
                    className="hero__main-video-image"
                    poster={mainVideo?.image}
                    aria-label={mainVideo?.title}
                    src={mainVideo?.video}
                    ref={videoRef}
                    onTimeUpdate={() => {
                        const current = videoRef.current.currentTime;
                        const duration = videoRef.current.duration;
                        setCurrentTime(current);
                        const played = (current / duration) * 100;
                        setPlayedPercent(played);
                    }}
                    onLoadedMetadata={() => {
                        setDuration(videoRef.current.duration);
                        setCurrentTime(0);
                        setPlayedPercent(0);
                    }}
                />

                {/* Custom controls */}
                <div className="hero__overlay-container">
                    <div className="hero__play-overlay">
                        <button 
                            className={`hero__control-button ${isPlaying ? "hero__pause-button" : "hero__play-button"}`}
                            aria-label={isPlaying ? "Pause video" : "Play video"}
                            onClick={togglePlay} 
                        />
                    </div>
                    <div className="hero__scrub-overlay" onClick={handleScrub}>
                        <div className="hero__scrub-line-container">
                            <div className="hero__scrub--played" style={{ width: `${playedPercent}%` }}></div>
                            <div className="hero__scrub--buffered" style={{ width: `${bufferedPercent}%` }}></div>
                            <div className="hero__scrub--remaining" style={{ width: `${100 - bufferedPercent}%` }}></div>
                            <div className="hero__scrub-button" style={{ left: `${playedPercent}%` }}
                                onMouseDown={handleMouseDown}
                            >
                                <img src={ScrubButton} alt="Scrub Button" aria-label="Scrub" className="hero__scrub-button-icon"/>
                            </div>
                        </div>
                        
                        {/* Displays video duration */}
                        <div className="hero__scrub-duration-container">
                            <p className="hero__scrub-duration">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </p>
                        </div>
                    </div>
                    <div className="hero__video-buttons-container-overlay">
                        {isFullscreen ? (
                            <img
                            className="hero__close-fullscreen-button"
                            src={CloseFullscreenButton}
                            alt="Close Fullscreen Button"
                            aria-label="Close Fullscreen"
                            onClick={toggleFullscreen}  
                        />
                    ) : (
                        <img
                            className="hero__fullscreen-button"
                            src={FullscreenButton}
                            alt="Fullscreen Button"
                            aria-label="Fullscreen video"
                            onClick={toggleFullscreen}
                        />
                    )}
                    <div className="hero__volume-control" onMouseEnter={handleVolumeMouseEnter} onMouseLeave={handleVolumeMouseLeave}>
                        <img
                            className="hero__volume-up-button"
                            src={isMuted || volumePercent === 0 ? VolumeOffButton : VolumeUpButton}
                            alt="Volume Button"
                            onClick={toggleVolume}
                        />
                        <div className="hero__volume-scrub-container" ref={volumeScrubRef} onClick={handleVolumeScrubClick}
                            style={{ display: isHoveringVolume ? "block" : "none" }}
                            onMouseDown={handleVolumeMouseDown}>
                            <div className="hero__volume-scrub"
                                style={{ height: `${volumePercent}%` }}>
                                <img src={ScrubButton} alt="Scrub Handle" className="hero__scrub-handle"
                                    style={{ bottom: `calc(${volumePercent}% - .2rem)` }} />
                            </div>
                            <div className="hero__remaining-volume">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default Hero;