import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const PageNotFound: React.FC = () => {
  return (
    <div className="page-not-found">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="back-home">
        Go back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
