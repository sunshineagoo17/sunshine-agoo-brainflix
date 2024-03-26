import LoaderImg from "../../assets/images/icons/loader.png";

import "./Loader.scss";

const Loader = () => (
    <div className="loader__overlay">
        <img src={LoaderImg} alt="Loading..." className="loader__img"/>
    </div>
);

export default Loader;