import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Imports images for different 404 scenarios
import Loader from "../../components/Loader/Loader";
import AlienAbductionImage from "../../assets/images/pictures/404-alien-abduction.jpg";
import UnderConstructionImage from "../../assets/images/pictures/404-under-construction.jpg";
import DeveloperImage from "../../assets/images/pictures/404-developer-sleeping.jpg";
import MatrixImage from "../../assets/images/pictures/404-matrix.jpg";
import TimeTravelImage from "../../assets/images/pictures/404-time-travel.jpg";

import "./NotFoundPage.scss";

const NotFoundPage = () => {
    // State to control the loading indicator
    const [isLoading , setIsLoading] = useState(true);

    useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
        }

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
            copy: "Great Scott! Looks like you've ventured into the time vortex. Hang tight while we dial back the clock and find that missing page!",
            image: TimeTravelImage,
        },
    ];

    // Function to cycle through the imageArr and display a new message and image each time a 404 is encountered 
    const getNextOption = () => {
        let nextIndex = 0; 
        try {
            // Retrieve the last shown index from sessionStorage
            const lastIndex = parseInt(sessionStorage.getItem("lastShownIndex"), 10);
            if (!isNaN(lastIndex) && lastIndex >= 0) {
                nextIndex = (lastIndex + 1) % imageArr.length; 
            }
            // Update the sessionStorage with the new index for the next load
            sessionStorage.setItem("lastShownIndex", nextIndex.toString());
        } catch (e) {
            console.error("Error accessing sessionStorage", e);
        }
        return imageArr[nextIndex];
    };

    const [currentOption, setCurrentOption] = useState(getNextOption);

    const handleNextOptionClick = () => {
        setCurrentOption(getNextOption());
    };

    return (
        <>
            {isLoading && <Loader />}
            {/* If the loading is true, the Loader component is displayed to indicate that the page is currently loading  */}
            {!isLoading && (
                <div className="notFoundPage">
                  
                    <div className="notFoundPage__nav-divider-container">
                        <hr className="notFoundPage__nav-divider" />
                    </div>

                    <div className="notFoundPage__content-container">
                        <div className="notFoundPage__title-container">
                            <h1 className="notFoundPage__title">Page Not Found</h1>
                        </div>

                        <div className="notFoundPage__divider-container--top">
                            <hr className="notFoundPage__divider--top" />
                        </div>

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

                        <div className="notFoundPage__graphic-container">
                            {/* Displaying the selected image from the current option */}
                            <img src={currentOption?.image} alt="404 graphic" className="notFoundPage__graphic" />
                        </div>

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