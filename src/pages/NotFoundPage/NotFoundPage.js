import { Link } from "react-router-dom";
import AlienAbductionImage from "../../assets/images/pictures/404-alien-abduction.jpg";
import UnderConstructionImage from "../../assets/images/pictures/404-under-construction.jpg";
import DeveloperImage from "../../assets/images/pictures/404-developer-sleeping.jpg";

// Imports the stylesheet for the NotFoundPage component
import "./NotFoundPage.scss";

const NotFoundPage = () => {

    //Array containing different options for the 404 page with corresponding images
    const imageArr = [
        {
            copy: "Oops! The page you are looking for does not exist.",
            image: DeveloperImage,
        },
        {
            copy: "Oh no! They're at it again. Aliens have abducted this page",
            image: AlienAbductionImage,
        },
        {
            copy: "Uh-oh! This page is undergoing some to-secret, super cool construction.",
            image: UnderConstructionImage,
        },
    ];

    // Randomly select an option from the array
    const currentOption = imageArr[Math.floor(Math.random() * imageArr.length)];

    return (
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
                        {currentOption?.copy} But don't worry, you can find plenty of other awesome things to check out on our{" "} 
                        <Link to="/home" className="notFoundPage__homepage-link" aria-label="Homepage">
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
    );
}

export default NotFoundPage;