// Imports the loader img
import LoaderImg from "../../assets/images/icons/loader.png";

//Imports the styling to the Loader component
import "./Loader.scss";

const Loader = () => (
    <div className="loader__overlay">
        <img src={LoaderImg} alt="Loading..." className="loader__img"/>
    </div>
);

export default Loader;