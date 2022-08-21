import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/posts";
import { useAppContext } from "../../context/AppContext";
import "./Newpost.scss";

const Newpost = () => {
  const navigate = useNavigate();
  const { posts, setPosts } = useAppContext();

  const [formData, setFormData] = useState({
    title: "",
    post: "",
    author: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFormDataSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const newPost = { id: parseInt(id), ...formData };
    try {
      await api.post(`/posts`, newPost);
      setFormData({ title: "", post: "", author: "" });
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      navigate("/");
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <main className="app__newpost">
      <h1 className="app__newpost-title">New post</h1>

      <form className="app__newpost-form" onSubmit={handleFormDataSubmit}>
        <div className="app__newpost-form_grp">
          <label htmlFor="editTitle">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Edit title"
            value={formData.title}
            onChange={handleFormData}
          />
        </div>
        <div className="app__newpost-form_grp">
          <label htmlFor="editPost">Post</label>
          <textarea
            name="post"
            id="post"
            placeholder="Edit post..."
            value={formData.post}
            onChange={handleFormData}
          ></textarea>
        </div>
        <div className="app__newpost-form_grp">
          <label htmlFor="editAuthor">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Edit author"
            value={formData.author}
            onChange={handleFormData}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          disableElevation
          disableRipple
          color="info"
        >
          Update
        </Button>
      </form>
    </main>
  );
};

export default Newpost;
