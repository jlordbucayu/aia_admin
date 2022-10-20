import React from "react";
import Body from "./layout/Body";
import NavBar from "./layout/NavBar";
import CreateArticle from "./pages/CreateArticle";
import { useSelector } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";
import Articles from "./pages/Articles";
import UpdateArticle from "./pages/UpdateArticle";
export default function App() {
  const { content } = useSelector((state) => state.ckeditor);



  return (
    <div>
      <NavBar />
      

      <Body>

      <Routes>
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/" element={<Articles />} />
        <Route path="/update/:_id" element={<UpdateArticle/>} />
      </Routes>

        
      </Body>

     
    </div>
  );
}
