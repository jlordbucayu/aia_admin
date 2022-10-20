import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // function createMarkup(content) {
  //   return { __html: content };
  // }
  return (
    <div className="p-5 bg-white border-solid border border-gray-500 rounded w-[300px]">
      <img src={item.banner_image} alt="" />

      <div>
        <p>{item.date_published}</p>
        <p className="font-bold text-lg">{item.title}</p>
        <span className="text-base">Are you ready to live the Plant life?</span>

        <div className="flex gap-5 mt-5 text-center">
        
          <button className="bg-gray-200 py-1 px-5 rounded"><Link to="/update/634ebe2142b3e29126ee3a24">Update</Link></button>
        </div>
      </div>
      {/* <div dangerouslySetInnerHTML={createMarkup(item.content)}></div> */}
    </div>
  );
};

export default Card;



