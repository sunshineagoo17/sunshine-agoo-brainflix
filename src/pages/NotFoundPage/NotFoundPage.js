import { Link } from "react-router-dom";

// Imports an image to use on the 404 page
import developerImage from "../../assets/images/pictures/developer-sleeping-404-page.jpg";

// Imports the stylesheet for the NotFoundPage component
import "./NotFoundPage.scss";

const NotFoundPage = () => {
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
                    <p className="notFoundPage__body-copy">Oops! The page you are looking for does not exist. But don't worry, you can find plenty of other awesome things to check out on our <Link to="/home" className="notFoundPage__homepage-link">homepage</Link>.</p> 
                </div>

                {/* Developer Image */}
                <div className="notFoundPage__developer-container">
                    <img src={developerImage} alt="Developer sleeping at his computer with his dog" className="notFoundPage__developer" />
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