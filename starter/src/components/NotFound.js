import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found-wrap">
            <h1>Page Not Found</h1>
            <h3>This URL does not lead anywhere!</h3>
            <Link to="/">Click Here to go Home</Link>
        </div>
    )
};

export default NotFound;