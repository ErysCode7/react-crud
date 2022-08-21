import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/posts";
import { useAppContext } from "../../../context/AppContext";
import "./Postdetails.scss";

const Postdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, setPosts } = useAppContext();

  const singlePost = posts.find((post) => post.id.toString() === id);

  const { post, title, author } = singlePost || {};

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const currentPosts = posts.filter((post) => post.id !== id);
      setPosts(currentPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <>
      {!singlePost && (
        <Card className="app__home-postfeed_postdetails">
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              gutterBottom
              className="app__home-postfeed_post-title"
            >
              No post available.
            </Typography>

            <Typography variant="body2">
              Refresh the page or go back to post feed
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/">
              <Button size="small">Back to post feed</Button>
            </Link>
          </CardActions>
        </Card>
      )}
      {singlePost && (
        <Card className="app__home-postfeed_postdetails">
          <CardContent>
            {title && (
              <Typography
                sx={{ fontSize: 20 }}
                gutterBottom
                className="app__home-postfeed_post-title"
              >
                {title}
              </Typography>
            )}

            {post && <Typography variant="body2">{post}</Typography>}
            {author && (
              <Typography sx={{ mt: 1.5 }} color="text.secondary">
                By: {author}
              </Typography>
            )}
          </CardContent>
          <Stack
            direction="row"
            spacing={2}
            className="app__home-postfeed_postdetails-buttons"
          >
            <Link to={`/post/edit/${singlePost.id}`}>
              <Button
                variant="contained"
                endIcon={<EditIcon />}
                disableElevation
                disableRipple
                color="success"
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              disableElevation
              disableRipple
              color="error"
              onClick={() => handleDelete(singlePost.id)}
            >
              Delete
            </Button>
          </Stack>
          <CardActions>
            <Link to="/">
              <Button size="small">Back to post feed</Button>
            </Link>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Postdetails;
