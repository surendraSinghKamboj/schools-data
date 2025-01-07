import { InputAttributes } from "@/interface/Inputs";
import React from "react";



const Input: React.FC<InputAttributes> = ({ label,type, name, value, handleChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium">{label}:</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
      />
    </div>
  );
};

export default Input;
