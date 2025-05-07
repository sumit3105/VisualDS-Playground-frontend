// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="py-6 text-center shadow-lg bg-white">
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-bold cursor-pointer text-indigo-600"
      >
        VisualDS-Playground
      </h1> 
    </header>
  );
};

export default Header;
