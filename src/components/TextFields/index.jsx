import React from "react";

const TextField = ({ label,value,name, handleChange }) => {
  return (
    <div className="flex gap-5 flex-col">
      <label className="font-semibold">{label}</label>
      <input
        name={name}
        type="text"
        className="border-gray-200 border border-solid w-full p-2 rounded"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default TextField;
