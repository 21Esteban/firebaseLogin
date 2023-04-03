import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export const NotFound = () => {
    

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        Not found error 404
      </p>
      <button><Link to="/">Back to Home</Link></button>
    </div>
  );
};
