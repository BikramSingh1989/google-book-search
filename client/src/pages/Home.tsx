import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


const Home: React.FC = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold">Welcome to Book Search</h1>
      <p className="mt-2 text-gray-600">Find and save your favorite books!</p>
      
      <div className="mt-4 space-x-4">
        <Link to="/search" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search Books
        </Link>
        <Link to="/saved" className="bg-green-500 text-white px-4 py-2 rounded">
          View Saved Books
        </Link>
      </div>
    </div>
  );
};

<div className="mt-32 pt-20 text-center">
  <h2 className="text-3xl font-bold">Welcome to Book Search</h2>
</div>

export default Home;
