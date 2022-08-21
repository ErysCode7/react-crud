import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../api/posts";
import { useAppContext } from "../../../context/AppContext";
import "./PostEditDetails.scss";

const Posteditdetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { posts, setPosts } = useAppContext();

  const [editFormData, setEditFormData] = useState({
    title: "",
    post: "",
    author: "",
  });

  const post = posts.find((post) => post.id.toString() === id);

  useEffect(() => {
    if (post) {
      setEditFormData({
        title: post.title,
        post: post.post,
        author: post.author,
      });
    }
  }, [posts, setEditFormData]);

  const handleEdit = async (id) => {
    const updatePost = {
      id: id,
      title: editFormData.title,
      post: editFormData.post,
      author: editFormData.author,
    };

    try {
      const response = await api.put(`/posts/${id}`, updatePost);

      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditFormData({ title: "", post: "", author: "" });
      navigate("/");
    } catch (err) {
      console.log(`Error ${err.message}`);
    }
  };

  return (
    <main className="app__posteditdetails">
      <h1 className="app__posteditdetails-title">
        {post && (
          <Link to={`/post/${post.id}`}>
            <KeyboardBackspaceIcon />
          </Link>
        )}
        Edit post
      </h1>
      <form
        className="app__posteditdetails-form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="app__posteditdetails-form_grp">
          <label htmlFor="editTitle">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Edit title"
            value={editFormData.title}
            onChange={(e) =>
              setEditFormData((prevData) => ({
                ...prevData,
                title: e.target.value,
              }))
            }
          />
        </div>
        <div className="app__posteditdetails-form_grp">
          <label htmlFor="editPost">Post</label>
          <textarea
            name="post"
            id="post"
            placeholder="Edit post..."
            value={editFormData.post}
            onChange={(e) =>
              setEditFormData((prevData) => ({
                ...prevData,
                post: e.target.value,
              }))
            }
          ></textarea>
        </div>
        <div className="app__posteditdetails-form_grp">
          <label htmlFor="editAuthor">Author</label>
          <input
            type="text"
            name="author"
            id="author"
            placeholder="Edit author"
            value={editFormData.author}
            onChange={(e) =>
              setEditFormData((prevData) => ({
                ...prevData,
                author: e.target.value,
              }))
            }
          />
        </div>
        <Button
          onClick={() => handleEdit(post.id)}
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

export default Posteditdetails;
