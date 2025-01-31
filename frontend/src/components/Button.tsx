import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, color = "blue" }) => {
const colorboton = color === "blue" ? "bg-blue-500 hover:bg-blue-700" : "bg-gray-500 hover:bg-gray-700"  
  return (

    <button
      onClick={onClick}
      className={`text-black font-semibold py-2 px-4 rounded ${colorboton} transition-colors duration-300 m-2`}
    >
      {text}
    </button>
  );
};

export default Button;
