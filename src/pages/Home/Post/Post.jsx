import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link } from "react-router-dom";
import "./Post.scss";

const Post = ({ id, post, title, author }) => {
  return (
    <Card>
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
      <CardActions>
        <Link to={`/post/${id}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Post;
