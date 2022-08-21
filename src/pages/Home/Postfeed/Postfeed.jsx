import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import React from "react";
import { Link } from "react-router-dom";
import Post from "../Post/Post";
import "./Postfeed.scss";

const Postfeed = ({ posts }) => {
  return (
    <section className="app__home-postfeed">
      {posts && (
        <>
          <h1 className="app__home-postfeed_title">Post feed</h1>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </>
      )}
      {!posts.length && (
        <Alert severity="info" className="app__home-postfeed_alert">
          <AlertTitle>No posts avalailable</AlertTitle>
          <Link className="app__home-postfeed_alert-link" to="/newpost">
            Add a new post here!
          </Link>
        </Alert>
      )}
    </section>
  );
};

export default Postfeed;
