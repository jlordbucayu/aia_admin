import React from "react";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="w-full bg-[#D31145] p-5 flex justify-between items-center">
     
      <div className="text-white flex gap-5">
    
       
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <button className="bg-white py-2 px-3 text-[#D31145] rounded font-semibold">
          <Link to="/create">Create Article</Link>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
