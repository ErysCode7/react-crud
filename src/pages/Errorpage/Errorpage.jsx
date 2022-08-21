import React from "react";
import { Link } from "react-router-dom";
import "./Errorpage.scss";

const Errorpage = () => {
  return (
    <main className="app__errorpage">
      <h1 className="app__errorpage-title">Oops!</h1>
      <h3>404 - PAGE NOT FOUND</h3>
      <Link to="/">
        <button className="app__errorpage-button">Go back to homepage</button>
      </Link>
    </main>
  );
};

export default Errorpage;
