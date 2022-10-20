import React, { useEffect } from "react";
import Card from "../components/Cards";
import { useDispatch, useSelector } from "react-redux";
import { get_articles } from "../features/articles/ArticlesSlice";

const Articles = () => {
  const dispatch = useDispatch();

  const { articles } = useSelector((state) => state.articles);

  useEffect(() => {
    dispatch(get_articles());
  }, []);
  return (
    
     
    <div>
      <div className="w-full m-5 p-5">
        <h2 className="font-semibold text-[20px]">Articles</h2>
      </div>
        <div className="p-5 flex gap-5">
        {articles.map((item) => (
          <Card item={item} />
        ))}
      </div>
    </div>
  
  );
};

export default Articles;
