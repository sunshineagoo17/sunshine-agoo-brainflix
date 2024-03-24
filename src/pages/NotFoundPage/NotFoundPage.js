import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Imports images for different 404 scenarios
import Loader from "../../components/Loader/Loader";
import AlienAbductionImage from "../../assets/images/pictures/404-alien-abduction.jpg";
import UnderConstructionImage from "../../assets/images/pictures/404-under-construction.jpg";
import DeveloperImage from "../../assets/images/pictures/404-developer-sleeping.jpg";
import MatrixImage from "../../assets/images/pictures/404-matrix.jpg";
import TimeTravelImage from "../../assets/images/pictures/404-time-travel.jpg";

// Imports the stylesheet for the NotFoundPage component
import "./NotFoundPage.scss";

const NotFoundPage = () => {
    // State to control the loading indicator
    const [isLoading , setIsLoading] = useState(true);

    // Effect hook to manage the loading state based on the entire page load
    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        // If the document is already loaded, call handleLoad immediately; otherwise, wait for the load event
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Cleanup function to remove the event listener
        return () => window.removeEventListener("load", handleLoad);
    }, []);

    // Array containing different options for the 404 page with corresponding images
    const imageArr = [
        {
            id: 0,
            copy: "Shhh! The page you are looking for does not exist. Our hardworking devs will be right on it once they wake up.",
            image: DeveloperImage,
        },
        {
            id: 1,
            copy: "Oh no! They're at it again. Aliens have abducted this page.",
            image: AlienAbductionImage,
        },
        {
            id: 2,
            copy: "Uh-oh! This page is undergoing some top-secret, super cool construction.",
            image: UnderConstructionImage,
        },
        {
            id: 3,
            copy: "Whoa, Neo, wrong turn! You should've followed the white rabbit.",
            image: MatrixImage,
        },       
        {
            id: 4,
            copy: "Great Scott! Lookis like you've ventured into the time vortex. Hang tight while we dial back the clock and find that missing page!",
            image: TimeTravelImage,
        },
    ];

    // Function to cycle through the imageArr and display a new message and image each time a 404 is encountered 
    const getNextOption = () => {
        try {
            // Retrieving the last shown index from local Storage, if available
            const lastIndex = parseInt(localStorage.getItem("lastShownIndex"), 10);
            // Calculating the next index; if at the end of the array, loop back to the start
            let nextIndex = lastIndex >= 0 && lastIndex < imageArr.length - 1 ? lastIndex + 1 : 0;
            // Storing the next index for future visits
            localStorage.setItem("lastShownIndex", nextIndex.toString());
            return imageArr[nextIndex];
        } catch (e) {
            console.error("Error accessing localStorage", e);
            // Defaulting to the first message and image in case of any error
            return imageArr[0];
        }
    };

    // State to hold the currently selected 404 message and image
    const [currentOption, setCurrentOption] = useState(getNextOption);

    // Function to update the currentOption to state with a new 404 scenario
    const handleNextOptionClick = () => {
        setCurrentOption(getNextOption());
    };

    return (
        <>
            {isLoading && <Loader />}
            {/* If the loading is true, the Loader component is displayed to indicate that the page is currently loading  */}
            {!isLoading && (
                <div className="notFoundPage">
                    {/* Nav Divider */}
                    <div className="notFoundPage__nav-divider-container">
                        <hr className="notFoundPage__nav-divider" />
                    </div>

                    {/* Container for all content displayed on the 404 page */}
                    <div className="notFoundPage__content-container">
                        <div className="notFoundPage__title-container">
                            <h1 className="notFoundPage__title">Page Not Found</h1>
                        </div>

                        {/* Top Divider - displays only for mobile and desktop screen */}
                        <div className="notFoundPage__divider-container--top">
                            <hr className="notFoundPage__divider--top" />
                        </div>

                        {/* Container for the main message, guiding users back to the homepage */}
                        <div className="notFoundPage__body-copy-container">
                            <p className="notFoundPage__body-copy">
                                {/* Displaying the selected message from the current option */}
                                {currentOption?.copy} Don't worry, you can find plenty of other awesome things to check out on our{" "} 
                                <Link to="/home" onClick={handleNextOptionClick} className="notFoundPage__homepage-link" aria-label="Homepage">
                                    homepage
                                </Link>
                                .
                            </p>
                        </div>

                        {/* Developer Image */}
                        <div className="notFoundPage__graphic-container">
                            {/* Displaying the selected image from the current option */}
                            <img src={currentOption?.image} alt="404 graphic" className="notFoundPage__graphic" />
                        </div>

                        {/* Bottom Divider - displays only for mobile and desktop screen */}
                        <div className="notFoundPage__divider-container--bottom">
                            <hr className="notFoundPage__divider--bottom" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default NotFoundPage;