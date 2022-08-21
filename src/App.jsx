import React from "react";
import "./App.scss";
//routing
import { Route, Routes } from "react-router-dom";
//components
import { Navbar } from "./components";
//pages
import { About, Errorpage, Home, Newpost } from "./pages";
//single post details
import Postdetails from "./pages/Home/Postdetails/Postdetails";
//post edit details
import PostEditDetails from "./pages/Home/PostEditDetails/PostEditDetails";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Postdetails />} />
        <Route path="/post/edit/:id" element={<PostEditDetails />} />
        <Route path="/newpost" element={<Newpost />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
};

export default App;
